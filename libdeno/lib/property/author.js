import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createAuthorCaller = (contract) => always(execute({ contract, method: 'author' }));
