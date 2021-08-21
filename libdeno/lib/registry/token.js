import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createTokenCaller = (contract) => always(execute({ contract, method: 'token' }));
