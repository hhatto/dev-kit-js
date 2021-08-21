import Web3 from 'web3';
import { provider } from 'web3-core';
import { Contract } from 'web3-eth-contract/types';

declare const addresses: {
    readonly eth: {
        readonly main: {
            readonly registry: "0x1D415aa39D647834786EB9B5a333A50e9935b796";
        };
        readonly ropsten: {
            readonly registry: "0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70";
        };
    };
};

declare type CustomOptions = {
    readonly from?: string;
    readonly gasPrice?: string;
    readonly gas: number;
    readonly data: string;
};

declare type Event = {
    readonly address: string;
    readonly blockHash: string;
    readonly blockNumber: number;
    readonly event: string;
    readonly logIndex: number;
    readonly raw: {
        readonly data: string;
        readonly topics: string;
    };
    readonly returnValues: {
        readonly [key: string]: string | number;
    };
    readonly signature: string;
    readonly transactionHash: string;
    readonly transactionIndex: number;
};
declare type ReceiptEvent = {
    readonly [key: string]: Event;
};
declare type TxReceipt = {
    readonly blockHash: string;
    readonly blockNumber: number;
    readonly contractAddress: string | null;
    readonly cumulativeGasUsed: number;
    readonly events: ReceiptEvent;
    readonly from: string;
    readonly gasUsed: number;
    readonly logsBloom: string;
    readonly status: boolean;
    readonly to: string;
    readonly transactionHash: string;
    readonly transactionIndex: number;
};
declare type SendTx = Promise<TxReceipt> & {
    readonly on: <T extends 'transactionHash' | 'confirmation' | 'error'>(type: T, callback: T extends 'transactionHash' ? (hash: string) => void : T extends 'confirmation' ? (confirmationNumber: number, receipt: TxReceipt) => void : (err: Readonly<Error>) => void) => SendTx;
};

declare type CreateMarketContract = {
    readonly schema: () => Promise<readonly string[]>;
    readonly behavior: () => Promise<string>;
    readonly vote: (propertyAddress: string, agree: boolean) => Promise<TxReceipt>;
    readonly authenticate: (address: string, args: readonly string[], options: {
        readonly metricsFactory: string;
    }) => Promise<string>;
    readonly contract: () => Contract;
};
declare const createMarketContract: (client: Web3) => (address?: string | undefined, options?: CustomOptions | undefined) => CreateMarketContract;

declare type PropertyContract = {
    readonly totalSupply: () => Promise<string>;
    readonly balanceOf: (address: string) => Promise<string>;
    readonly transfer: (to: string, value: string) => Promise<boolean>;
    readonly allowance: (from: string, to: string) => Promise<string>;
    readonly approve: (to: string, value: string) => Promise<boolean>;
    readonly transferFrom: (from: string, to: string, value: string) => Promise<boolean>;
    readonly name: () => Promise<string>;
    readonly symbol: () => Promise<string>;
    readonly decimals: () => Promise<string>;
    readonly author: () => Promise<string>;
    readonly changeAuthor: (nextAuthor: string) => Promise<boolean>;
    readonly changeName: (nextName: string) => Promise<boolean>;
    readonly changeSymbol: (nextSymbol: string) => Promise<boolean>;
    readonly contract: () => Contract;
};
declare type CreatePropertyContract = (client: Web3) => (address?: string, options?: CustomOptions) => PropertyContract;
declare const createPropertyContract: CreatePropertyContract;

declare type WaitForEventOptions = {
    readonly metricsFactory: string;
};

declare type PropertyFactoryContract = {
    readonly create: (name: string, symbol: string, author: string) => Promise<string>;
    readonly createAndAuthenticate: (name: string, symbol: string, marketAddress: string, args: readonly string[], options: WaitForEventOptions) => Promise<{
        readonly property: string;
        readonly transaction: TxReceipt;
        readonly waitForAuthentication: () => Promise<string>;
    }>;
    readonly contract: () => Contract;
};
declare type CreatePropertyFactoryContract = (client: Web3) => (address?: string, options?: CustomOptions) => PropertyFactoryContract;
declare const createPropertyFactoryContract: CreatePropertyFactoryContract;

declare type CreateAllocatorContract = {
    readonly calculateMaxRewardsPerBlock: () => Promise<string>;
    readonly contract: () => Contract;
};
declare const createAllocatorContract: (client: Web3) => (address?: string | undefined, options?: CustomOptions | undefined) => CreateAllocatorContract;

declare type LockupContract = {
    readonly getValue: (propertyAddress: string, accountAddress: string) => Promise<string>;
    readonly getAllValue: () => Promise<string>;
    readonly getPropertyValue: (address: string) => Promise<string>;
    readonly withdraw: (propertyAddress: string, amount: string) => Promise<boolean>;
    readonly calculateWithdrawableInterestAmount: (propertyAddress: string, accountAddress: string) => Promise<string>;
    readonly calculateCumulativeHoldersRewardAmount: (propertyAddress: string) => Promise<string>;
    readonly getStorageWithdrawalStatus: (propertyAddress: string, accountAddress: string) => Promise<string>;
    readonly calculateCumulativeRewardPrices: () => Promise<readonly [string, string, string, string]>;
    readonly calculateRewardAmount: (propertyAddress: string) => Promise<readonly [string, string]>;
    readonly cap: () => Promise<string>;
    readonly contract: () => Contract;
};
declare type CreateLockupContract = (client: Web3) => (address?: string, options?: CustomOptions) => LockupContract;
declare const createLockupContract: CreateLockupContract;

declare type DevContract = {
    readonly totalSupply: () => Promise<string>;
    readonly balanceOf: (address: string) => Promise<string>;
    readonly transfer: (to: string, value: string) => Promise<boolean>;
    readonly allowance: (from: string, to: string) => Promise<string>;
    readonly approve: (to: string, value: string) => Promise<boolean>;
    readonly transferFrom: (from: string, to: string, value: string) => Promise<boolean>;
    readonly name: () => Promise<string>;
    readonly symbol: () => Promise<string>;
    readonly decimals: () => Promise<string>;
    readonly deposit: (to: string, value: string) => Promise<boolean>;
    readonly contract: () => Contract;
};
declare type CreateDevContract = (client: Web3) => (address?: string, options?: CustomOptions) => DevContract;
declare const createDevContract: CreateDevContract;

declare type WithdrawContract = {
    readonly withdraw: (propertyAddress: string) => Promise<boolean>;
    readonly bulkWithdraw: (propertyAddresses: readonly string[]) => Promise<TxReceipt>;
    readonly getRewardsAmount: (propertyAddress: string) => Promise<string>;
    readonly calculateWithdrawableAmount: (propertyAddress: string, accountAddress: string) => Promise<string>;
    readonly calculateRewardAmount: (propertyAddress: string, accountAddress: string) => Promise<readonly [string, string, string, string]>;
    readonly contract: () => Contract;
};
declare type CreateWithdrawContract = (client: Web3) => (address?: string, options?: CustomOptions) => WithdrawContract;
declare const createWithdrawContract: CreateWithdrawContract;

declare type RegistryContract = {
    readonly allocator: () => Promise<string>;
    readonly allocatorStorage: () => Promise<string>;
    readonly lockup: () => Promise<string>;
    readonly lockupStorage: () => Promise<string>;
    readonly marketFactory: () => Promise<string>;
    readonly marketGroup: () => Promise<string>;
    readonly metricsFactory: () => Promise<string>;
    readonly metricsGroup: () => Promise<string>;
    readonly policy: () => Promise<string>;
    readonly policyFactory: () => Promise<string>;
    readonly policySet: () => Promise<string>;
    readonly policyGroup: () => Promise<string>;
    readonly propertyFactory: () => Promise<string>;
    readonly propertyGroup: () => Promise<string>;
    readonly token: () => Promise<string>;
    readonly withdraw: () => Promise<string>;
    readonly withdrawStorage: () => Promise<string>;
    readonly contract: () => Contract;
};
declare type CreateRegistryContract = (client: Web3) => (address?: string, options?: CustomOptions) => RegistryContract;
declare const createRegistryContract: CreateRegistryContract;

declare type PolicyContract = {
    readonly holdersShare: (amount: string, lockups: string) => Promise<string>;
    readonly rewards: (lockups: string, assets: string) => Promise<string>;
    readonly authenticationFee: (assets: string, propertyAssets: string) => Promise<string>;
    readonly marketApproval: (agree: string, opposite: string) => Promise<boolean>;
    readonly policyApproval: (agree: string, opposite: string) => Promise<boolean>;
    readonly marketVotingBlocks: () => Promise<string>;
    readonly policyVotingBlocks: () => Promise<string>;
    readonly shareOfTreasury: (supply: string) => Promise<string>;
    readonly treasury: () => Promise<string>;
    readonly capSetter: () => Promise<string>;
    readonly contract: () => Contract;
};
declare type CreatePolicyContract = (client: Web3) => (address?: string, options?: CustomOptions) => PolicyContract;
declare const createPolicyContract: CreatePolicyContract;

declare type PolicyGroupContract = {
    readonly voting: (policyAddress: string) => Promise<boolean>;
    readonly isGroup: (policyAddress: string) => Promise<boolean>;
    readonly contract: () => Contract;
};
declare type CreatePolicyGroupContract = (client: Web3) => (address?: string, options?: CustomOptions) => PolicyGroupContract;
declare const createPolicyGroupContract: CreatePolicyGroupContract;

declare type CreateMetricsContract = {
    readonly property: () => Promise<string>;
    readonly market: () => Promise<string>;
    readonly contract: () => Contract;
};
declare const createMetricsContract: (client: Web3) => (address?: string | undefined, options?: CustomOptions | undefined) => CreateMetricsContract;

declare type PolicyFactoryContract = {
    readonly create: (newPolicyAddress: string) => Promise<boolean>;
    readonly convergePolicy: (currentPolicyAddress: string) => Promise<boolean>;
    readonly forceAttach: (policy: string) => Promise<boolean>;
    readonly contract: () => Contract;
};
declare type CreatePolicyFactoryContract = (client: Web3) => (address?: string, options?: CustomOptions) => PolicyFactoryContract;
declare const createPolicyFactoryContract: CreatePolicyFactoryContract;

declare type DevkitContract = {
    readonly allocator: ReturnType<typeof createAllocatorContract>;
    readonly market: ReturnType<typeof createMarketContract>;
    readonly property: ReturnType<typeof createPropertyContract>;
    readonly propertyFactory: ReturnType<typeof createPropertyFactoryContract>;
    readonly lockup: ReturnType<typeof createLockupContract>;
    readonly withdraw: ReturnType<typeof createWithdrawContract>;
    readonly dev: ReturnType<typeof createDevContract>;
    readonly registry: ReturnType<typeof createRegistryContract>;
    readonly policy: ReturnType<typeof createPolicyContract>;
    readonly policyGroup: ReturnType<typeof createPolicyGroupContract>;
    readonly metrics: ReturnType<typeof createMetricsContract>;
    readonly policyFactory: ReturnType<typeof createPolicyFactoryContract>;
};
declare type ContractFactory = (provider: provider) => DevkitContract;
declare type CreateDevkitContract = (client: Web3) => DevkitContract;
declare const createDevkitContract: CreateDevkitContract;
declare const contractFactory: ContractFactory;

declare type CreateGetVotablePolicyCaller = (policyGroup: PolicyGroupContract) => () => Promise<readonly string[]>;
declare const createGetVotablePolicy: CreateGetVotablePolicyCaller;

declare type DevStats = {
    readonly devPrice: number;
    readonly totalCap: number;
    readonly marketCap: number;
    readonly stakingRatio: number;
    readonly stakingAmount: number;
    readonly stakerAPY: number;
    readonly creatorAPY: number;
    readonly annualSupplyGrowthRatio: number;
    readonly creatorsRewardsDEV: number;
    readonly creatorsRewardsUSD: number;
};
declare type GetStatsCaller = (httpProviderEndpoint: string) => Promise<DevStats>;
declare const getStats: GetStatsCaller;

declare type DevkitClient = {
    readonly createGetVotablePolicy: typeof createGetVotablePolicy;
    readonly getStats: typeof getStats;
};
declare const client: DevkitClient;

declare type Args = ReadonlyArray<string | boolean | readonly string[]>;
declare type Options = {
    readonly contract: Contract;
    readonly method: string;
    readonly args?: Args;
    readonly mutation?: boolean;
    readonly client?: Web3;
    readonly padEnd?: number;
};
declare type SendOptions = Options & {
    readonly mutation: true;
    readonly client: Web3;
};
declare type CallOptions = Options & {
    readonly mutation?: false;
};
declare type ExecuteOptions = CallOptions | SendOptions;
declare type ExecuteFunction = <T = string, O extends ExecuteOptions = CallOptions>(opts: O) => Promise<O extends CallOptions ? T : O extends SendOptions ? TxReceipt : never>;
declare const execute: ExecuteFunction;

declare const getAccount: (web3: Web3) => Promise<string>;

declare const txPromisify: (tx: SendTx) => Promise<TxReceipt>;

declare type WatchEventOptions = {
    readonly contract: Contract;
    readonly resolver: (e: Event) => Promise<boolean | void>;
    readonly fromBlock?: number;
};
declare const watchEvent: ({ contract, resolver, fromBlock, }: WatchEventOptions) => Promise<Event>;

declare type DevkitUtils = {
    readonly execute: typeof execute;
    readonly getAccount: typeof getAccount;
    readonly txPromisify: typeof txPromisify;
    readonly watchEvent: typeof watchEvent;
};
declare const utils: DevkitUtils;

declare type CreateMetricsGroupContract = {
    readonly totalAuthenticatedProperties: () => Promise<string>;
    readonly contract: () => Contract;
};
declare const createMetricsGroupContract: (client: Web3) => (address?: string | undefined, options?: CustomOptions | undefined) => CreateMetricsGroupContract;

export { ContractFactory, CreateAllocatorContract, CreateDevContract, CreateDevkitContract, CreateLockupContract, CreateMarketContract, CreateMetricsContract, CreateMetricsGroupContract, CreatePolicyContract, CreatePolicyFactoryContract, CreatePolicyGroupContract, CreatePropertyContract, CreatePropertyFactoryContract, CreateRegistryContract, CreateWithdrawContract, CustomOptions, DevContract, DevkitClient, DevkitContract, DevkitUtils, LockupContract, PolicyContract, PolicyFactoryContract, PolicyGroupContract, PropertyContract, PropertyFactoryContract, RegistryContract, WithdrawContract, addresses, client, contractFactory, createAllocatorContract, createDevContract, createDevkitContract, createLockupContract, createMarketContract, createMetricsContract, createMetricsGroupContract, createPolicyContract, createPolicyFactoryContract, createPolicyGroupContract, createPropertyContract, createPropertyFactoryContract, createRegistryContract, createWithdrawContract, utils };
