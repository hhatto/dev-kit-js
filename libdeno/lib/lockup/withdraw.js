import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createWithdrawCaller = (contract, client) => async (propertyAddress, amount) => execute({
    contract,
    method: 'withdraw',
    mutation: true,
    client,
    args: [propertyAddress, amount],
}).then(T);
