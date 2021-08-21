import { execute } from '../utils/execute';
export const createCalculateWithdrawableInterestAmountCaller = (contract) => async (propertyAddress, account) => execute({
    contract,
    method: 'calculateWithdrawableInterestAmount',
    args: [propertyAddress, account],
});
