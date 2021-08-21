import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createChangeAuthorCaller = (contract, client) => async (nextAuther) => execute({
    contract,
    method: 'changeAuthor',
    mutation: true,
    client,
    args: [nextAuther],
}).then(T);
