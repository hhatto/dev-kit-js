import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createPropertyCaller = (contract) => always(execute({
    contract,
    method: 'property',
}));
