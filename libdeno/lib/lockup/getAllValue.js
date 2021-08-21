import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createGetAllValueCaller = (contract) => always(execute({ contract, method: 'getAllValue' }));
