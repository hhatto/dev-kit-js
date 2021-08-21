import { execute } from '../utils/execute';
export const createVotingCaller = (contract) => async (policyAddress) => execute({
    contract,
    method: 'voting',
    args: [policyAddress],
});
