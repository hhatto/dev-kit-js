import { execute } from '../utils/execute';
export const createCalculateCumulativeHoldersRewardAmountCaller = (contract) => async (propertyAddress) => execute({
    contract,
    method: 'calculateCumulativeHoldersRewardAmount',
    args: [propertyAddress],
});
