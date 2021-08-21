import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createSymbolCaller = (contract) => always(execute({ contract, method: 'symbol' }));
