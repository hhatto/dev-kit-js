import { execute } from '../utils/execute';
import { always } from 'ramda';
import { arrayify } from '../utils/arrayify';
export const createCalculateCumulativeRewardPricesCaller = (contract) => always(execute({
    contract,
    method: 'calculateCumulativeRewardPrices',
}).then((r) => arrayify(r)));
