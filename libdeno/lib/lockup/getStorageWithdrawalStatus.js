import { execute } from '../utils/execute';
export const createGetStorageWithdrawalStatusCaller = (contract) => async (propertyAddress, accountAddress) => execute({
    contract,
    method: 'getStorageWithdrawalStatus',
    args: [propertyAddress, accountAddress],
});
