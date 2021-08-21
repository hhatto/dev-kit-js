import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createCapCaller = (contract) => always(execute({ contract, method: 'cap' }));
