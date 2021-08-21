import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createChangeSymbolCaller = (contract, client) => async (nextSymbol) => execute({
    contract,
    method: 'changeSymbol',
    mutation: true,
    client,
    args: [nextSymbol],
}).then(T);
