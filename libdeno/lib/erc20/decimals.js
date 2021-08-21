import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createDecimalsCaller = (contract) => always(execute({ contract, method: 'decimals' }));
