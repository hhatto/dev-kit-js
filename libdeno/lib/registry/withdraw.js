import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createWithdrawCaller = (contract) => always(execute({ contract, method: 'withdraw' }));
