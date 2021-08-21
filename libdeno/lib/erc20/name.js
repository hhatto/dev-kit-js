import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createNameCaller = (contract) => always(execute({ contract, method: 'name' }));
