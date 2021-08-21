import { execute } from '../utils/execute';
export const createVoteCaller = (contract, client) => async (propertyAddress, agree) => execute({
    contract,
    method: 'vote',
    mutation: true,
    client,
    args: [propertyAddress, agree],
});
