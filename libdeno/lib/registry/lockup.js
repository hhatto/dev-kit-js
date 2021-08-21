import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createLockupCaller = (contract) => always(execute({ contract, method: 'lockup' }));
