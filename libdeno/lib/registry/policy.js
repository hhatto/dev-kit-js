import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createPolicyCaller = (contract) => always(execute({ contract, method: 'policy' }));
