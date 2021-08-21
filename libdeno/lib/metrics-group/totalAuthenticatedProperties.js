import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createTotalAuthenticatedPropertiesCaller = (contract) => always(execute({ contract, method: 'totalAuthenticatedProperties' }));
