import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createPropertyFactoryCaller = (contract) => always(execute({ contract, method: 'propertyFactory' }));
