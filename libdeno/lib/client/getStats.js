/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import bent from 'bent';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { always } from 'ramda';
import { addresses } from '../addresses';
import { createDevkitContract } from '../contract';
import { DEV_GRAPHQL_ENDPOINT } from '../utils/const';
const THEGRAPH_UNISWAP_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
const TEAM_WALLET_ADDRESSES = [
    '0x33b5043442979D2226E9a6389F7201932D11e448',
    '0xA47c73A77d358A985157034A2338fAB7742B107E',
    '0x0dAb082C2f2CD7C6C2a9335b69d0B2aB8121178D',
    '0x93d7A66E10b6a8a5a00313bC68F0FB234c8eB06D',
    '0x6B18fDa007ec96E187e5CF89D1873B9F75D5293D',
];
const falsyOrZero = (num) => (num ? num : 0);
const toNaturalBasis = new BigNumber(10).pow(18);
export const toNaturalNumber = (num) => new BigNumber(falsyOrZero(num)).div(toNaturalBasis);
const getEthPrice = always(bent(THEGRAPH_UNISWAP_ENDPOINT, 'POST', 'json')('', {
    query: `{ bundle(id: 1) { id ethPrice } }`,
    variables: null,
}).then((r) => r));
const getDevEthPrice = async (devkit) => {
    const devContractAddress = await devkit
        .registry(addresses.eth['main']?.registry)['token']();
    return bent(THEGRAPH_UNISWAP_ENDPOINT, 'POST', 'json')('', {
        query: `{ token(id: "${devContractAddress.toLowerCase()}") { derivedETH } }`,
        variables: null,
    }).then((r) => r);
};
const getDevPrice = async (devkit) => {
    const [{ data: ethPrice }, { data: devEthPrice }] = await Promise.all([
        getEthPrice(),
        getDevEthPrice(devkit),
    ]);
    const devPrice = ethPrice &&
        Number(ethPrice?.bundle.ethPrice) *
            Number(devEthPrice?.token?.derivedETH || '0');
    return new BigNumber(devPrice || '0');
};
const getTotalCap = async (devkit) => {
    const devContractAddress = await devkit
        .registry(addresses.eth['main']?.registry)['token']();
    const totalSupply = await devkit.dev(devContractAddress).totalSupply();
    const devPrice = await getDevPrice(devkit);
    const devTotalCap = new BigNumber(devPrice.toNumber() * toNaturalNumber(totalSupply).toNumber());
    return devTotalCap;
};
const getCirculatingSupply = async (devkit) => {
    const devContractAddress = await devkit
        .registry(addresses.eth['main']?.registry)['token']();
    const totalSupply = new BigNumber(await getTotalSupply(devkit));
    const dev = devkit.dev(devContractAddress);
    const teamAmounts = await Promise.all(TEAM_WALLET_ADDRESSES.map(dev.balanceOf));
    const teamAmount = BigNumber.sum(...teamAmounts);
    const circulatingSupply = totalSupply.minus(teamAmount);
    return circulatingSupply;
};
const getMarketCap = async (devkit) => {
    // use from input parameter
    const devPrice = await getDevPrice(devkit);
    const circulatingSupply = await getCirculatingSupply(devkit);
    const marketCap = devPrice.multipliedBy(circulatingSupply);
    return toNaturalNumber(marketCap);
};
const getTotalStakingAmount = async (devkit) => {
    const devContractAddress = await devkit
        .registry(addresses.eth['main']?.registry)['lockup']();
    const totalStakingAmount = await devkit
        .lockup(devContractAddress)
        .getAllValue();
    return new BigNumber(totalStakingAmount);
};
const getStakingRatio = async (devkit) => {
    const totalStakingAmount = await getTotalStakingAmount(devkit);
    const circulatingSupply = await getCirculatingSupply(devkit);
    return totalStakingAmount.div(circulatingSupply);
};
const getAPY = async (devkit) => {
    const allocatorContractAddress = await devkit
        .registry(addresses.eth['main']?.registry)['allocator']();
    const maxRewards = await devkit
        .allocator(allocatorContractAddress)
        .calculateMaxRewardsPerBlock();
    const totalStakingAmount = await getTotalStakingAmount(devkit);
    const policyContractAddress = await devkit
        .registry(addresses.eth['main']?.registry)['policy']();
    const holdersShare = await devkit
        .policy(policyContractAddress)
        .holdersShare(maxRewards, totalStakingAmount.toFixed());
    const stakers = new BigNumber(maxRewards).minus(new BigNumber(holdersShare));
    const year = new BigNumber(2102400);
    const stakerAPY = stakers.times(year).div(totalStakingAmount);
    const creatorAPY = new BigNumber(holdersShare)
        .times(year)
        .div(totalStakingAmount);
    return { stakerAPY, creatorAPY };
};
const getTotalSupply = async (devkit) => {
    const devContractAddress = await devkit
        .registry(addresses.eth['main']?.registry)['token']();
    const totalSupply = await devkit.dev(devContractAddress).totalSupply();
    return totalSupply;
};
const getSupplyGrowth = async (devkit) => {
    const allocatorContractAddress = await devkit
        .registry(addresses.eth['main']?.registry)['allocator']();
    const maxRewards = await devkit
        .allocator(allocatorContractAddress)
        .calculateMaxRewardsPerBlock();
    const totalSupply = toNaturalNumber(await getTotalSupply(devkit));
    const year = new BigNumber(2102400);
    const annualSupplyGrowthRatio = toNaturalNumber(maxRewards)
        .times(year)
        .div(totalSupply);
    return annualSupplyGrowthRatio;
};
const getAssetOnboarded = always(bent(DEV_GRAPHQL_ENDPOINT, 'POST', 'json')('/', {
    query: `{ property_factory_create_aggregate(
			where: { authentication: { authentication_id: { _is_null: false } } }
		) { aggregate { count } } }`,
    variables: null,
}).then((r) => r.data
    .property_factory_create_aggregate.aggregate.count));
const getCreatorsRewardsDev = async (devkit, creatorAPY) => {
    const totalStakingAmount = await getTotalStakingAmount(devkit);
    const creatorsRewardsDev = creatorAPY.multipliedBy(totalStakingAmount);
    return creatorsRewardsDev;
};
// eslint-disable-next-line functional/functional-parameters
export const getStats = async (httpProviderEndpoint) => {
    const web3 = new Web3(httpProviderEndpoint);
    const devkit = createDevkitContract(web3);
    const [devPrice, totalCap, marketCap, stakingRatio, stakingAmount, { stakerAPY, creatorAPY }, annualSupplyGrowthRatio, assetOnboarded,] = await Promise.all([
        getDevPrice(devkit),
        getTotalCap(devkit),
        getMarketCap(devkit),
        getStakingRatio(devkit),
        getTotalStakingAmount(devkit),
        getAPY(devkit),
        getSupplyGrowth(devkit),
        getAssetOnboarded(),
    ]);
    const creatorsRewardsDEV = toNaturalNumber(await getCreatorsRewardsDev(devkit, creatorAPY));
    const creatorsRewardsUSD = devPrice.multipliedBy(creatorsRewardsDEV);
    return {
        devPrice: devPrice.toNumber(),
        totalCap: totalCap.toNumber(),
        marketCap: marketCap.toNumber(),
        stakingRatio: stakingRatio.toNumber(),
        stakingAmount: toNaturalNumber(stakingAmount).toNumber(),
        stakerAPY: stakerAPY.toNumber(),
        creatorAPY: creatorAPY.toNumber(),
        annualSupplyGrowthRatio: annualSupplyGrowthRatio.toNumber(),
        assetOnboarded: assetOnboarded,
        creatorsRewardsDEV: creatorsRewardsDEV.toNumber(),
        creatorsRewardsUSD: creatorsRewardsUSD.toNumber(),
    };
};
