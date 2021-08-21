import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createTotalSupplyCaller = (contract) => always(execute({ contract, method: 'totalSupply' }));
