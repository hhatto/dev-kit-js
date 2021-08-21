import { execute } from '../utils/execute';
export const createCreatePropertyCaller = (contract, client) => async (name, symbol, author) => execute({
    contract,
    method: 'create',
    args: [name, symbol, author],
    mutation: true,
    client,
}).then(({ events }) => events.Create.returnValues._property);
