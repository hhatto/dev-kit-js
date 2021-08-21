import { arrayify } from '../utils/arrayify';
import { execute } from '../utils/execute';
export const createCalculateRewardAmountCaller = (contract) => async (propertyAddress) => execute({
    contract,
    method: 'calculateRewardAmount',
    args: [propertyAddress],
}).then((r) => arrayify(r));
