import { withdrawAbi } from './abi';
import { createWithdrawCaller } from './withdraw';
import { createGetRewardsAmountCaller } from './getRewardsAmount';
import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount';
import { createBulkWithdrawCaller } from './bulkWithdraw';
import { always } from 'ramda';
import { calculateRewardAmountCaller } from './calculateRewardAmount';
export const createWithdrawContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...withdrawAbi], address, {
        ...options,
    });
    return {
        withdraw: createWithdrawCaller(contractClient, client),
        bulkWithdraw: createBulkWithdrawCaller(contractClient, client),
        getRewardsAmount: createGetRewardsAmountCaller(contractClient),
        calculateWithdrawableAmount: createCalculateWithdrawableAmountCaller(contractClient),
        calculateRewardAmount: calculateRewardAmountCaller(contractClient),
        contract: always(contractClient),
    };
};
