import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createMarketFactoryCaller = (contract) => always(execute({ contract, method: 'marketFactory' }));
