import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createChangeNameCaller = (contract, client) => async (nextName) => execute({
    contract,
    method: 'changeName',
    mutation: true,
    client,
    args: [nextName],
}).then(T);
