import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createDepositCaller = (contract, client) => async (to, value) => execute({
    contract,
    method: 'deposit',
    mutation: true,
    client,
    args: [to, value],
}).then(T);
