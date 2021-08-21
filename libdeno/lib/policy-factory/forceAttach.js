import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createForceAttachCaller = (contract, client) => async (policy) => execute({
    contract,
    method: 'forceAttach',
    mutation: true,
    client,
    args: [policy],
}).then(T);
