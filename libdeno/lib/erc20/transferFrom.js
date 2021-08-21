import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createTransferFromCaller = (contract, client) => async (from, to, value) => execute({
    contract,
    method: 'transferFrom',
    mutation: true,
    client,
    args: [from, to, value],
}).then(T);
