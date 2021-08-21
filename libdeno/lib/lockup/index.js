import { lockupAbi } from './abi';
import { createGetValueCaller } from './getValue';
import { createGetPropertyValueCaller } from './getPropertyValue';
import { createWithdrawCaller } from './withdraw';
import { createCalculateWithdrawableInterestAmountCaller } from './calculateWithdrawableInterestAmount';
import { createGetAllValueCaller } from './getAllValue';
import { createGetStorageWithdrawalStatusCaller } from './getStorageWithdrawalStatus';
import { createCalculateCumulativeHoldersRewardAmountCaller } from './calculateCumulativeHoldersRewardAmount';
import { createCalculateCumulativeRewardPricesCaller } from './calculateCumulativeRewardPrices';
import { createCalculateRewardAmountCaller } from './calculateRewardAmount';
import { createCapCaller } from './cap';
import { always } from 'ramda';
export const createLockupContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...lockupAbi], address, {
        ...options,
    });
    return {
        getValue: createGetValueCaller(contractClient),
        getAllValue: createGetAllValueCaller(contractClient),
        getPropertyValue: createGetPropertyValueCaller(contractClient),
        withdraw: createWithdrawCaller(contractClient, client),
        calculateWithdrawableInterestAmount: createCalculateWithdrawableInterestAmountCaller(contractClient),
        calculateCumulativeHoldersRewardAmount: createCalculateCumulativeHoldersRewardAmountCaller(contractClient),
        getStorageWithdrawalStatus: createGetStorageWithdrawalStatusCaller(contractClient),
        calculateCumulativeRewardPrices: createCalculateCumulativeRewardPricesCaller(contractClient),
        calculateRewardAmount: createCalculateRewardAmountCaller(contractClient),
        cap: createCapCaller(contractClient),
        contract: always(contractClient),
    };
};
