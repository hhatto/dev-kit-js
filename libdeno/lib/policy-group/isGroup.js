import { execute } from '../utils/execute';
export const createIsGroupCaller = (contract) => async (policyAddress) => execute({
    contract,
    method: 'isGroup',
    args: [policyAddress],
});
