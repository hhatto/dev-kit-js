import { execute } from '../utils/execute';
export const createCalculateWithdrawableAmountCaller = (contract) => async (propertyAddress, accountAddress) => execute({
    contract,
    method: 'calculateWithdrawableAmount',
    args: [propertyAddress, accountAddress],
});
