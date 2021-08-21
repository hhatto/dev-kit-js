import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createCreateCaller = (contract, client) => async (newPolicyAddress) => execute({
    contract,
    method: 'create',
    mutation: true,
    client,
    args: [newPolicyAddress],
}).then(T);
