import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createCalculateMaxRewardsPerBlockCaller = (contract) => always(execute({
    contract,
    method: 'calculateMaxRewardsPerBlock',
}));
