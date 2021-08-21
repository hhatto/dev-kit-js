import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createWithdrawStorageCaller = (contract) => always(execute({ contract, method: 'withdrawStorage' }));
