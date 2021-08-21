import { execute } from '../utils/execute';
export const createGetValueCaller = (contract) => async (propertyAddress, accountAddress) => execute({
    contract,
    method: 'getValue',
    args: [propertyAddress, accountAddress],
});
