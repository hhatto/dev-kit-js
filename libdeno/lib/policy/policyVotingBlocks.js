import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createPolicyVotingBlocksCaller = (contract) => always(execute({
    contract,
    method: 'policyVotingBlocks',
}));
