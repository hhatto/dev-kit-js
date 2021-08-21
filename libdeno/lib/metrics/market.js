import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createMarketCaller = (contract) => always(execute({
    contract,
    method: 'market',
}));
