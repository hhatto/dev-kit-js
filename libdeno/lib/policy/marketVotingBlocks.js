import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createMarketVotingBlocksCaller = (contract) => always(execute({
    contract,
    method: 'marketVotingBlocks',
}));
