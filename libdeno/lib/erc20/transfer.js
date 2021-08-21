import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createTransferCaller = (contract, client) => async (to, value) => execute({
    contract,
    method: 'transfer',
    mutation: true,
    client,
    args: [to, value],
}).then(T);
