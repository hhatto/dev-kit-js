import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createTreasuryCaller = (contract) => always(execute({
    contract,
    method: 'treasury',
}));
