import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createApproveCaller = (contract, client) => async (to, value) => execute({
    contract,
    method: 'approve',
    mutation: true,
    client,
    args: [to, value],
}).then(T);
