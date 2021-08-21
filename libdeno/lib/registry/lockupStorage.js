import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createLockupStorageCaller = (contract) => always(execute({ contract, method: 'lockupStorage' }));
