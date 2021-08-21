import { execute } from '../utils/execute';
export const createBulkWithdrawCaller = (contract, client) => async (propertyAddresses) => execute({
    contract,
    method: 'bulkWithdraw',
    mutation: true,
    client,
    args: [propertyAddresses],
});
