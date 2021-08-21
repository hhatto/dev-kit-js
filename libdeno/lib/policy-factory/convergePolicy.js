import { execute } from '../utils/execute';
import { T } from 'ramda';
export const createConvergePolicyCaller = (contract, client) => async (currentPolicyAddress) => execute({
    contract,
    method: 'convergePolicy',
    mutation: true,
    client,
    args: [currentPolicyAddress],
}).then(T);
