import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createPropertyGroupCaller = (contract) => always(execute({ contract, method: 'propertyGroup' }));
