import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createMarketGroupCaller = (contract) => always(execute({ contract, method: 'marketGroup' }));
