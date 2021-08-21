import { arrayify } from '../utils/arrayify';
import { execute } from '../utils/execute';
export const calculateRewardAmountCaller = (contract) => async (propertyAddress, accountAddress) => execute({
    contract,
    method: 'calculateRewardAmount',
    args: [propertyAddress, accountAddress],
}).then((r) => arrayify(r));
