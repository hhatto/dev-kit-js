import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createBehaviorCaller = (contract) => always(execute({
    contract,
    method: 'behavior',
}));
