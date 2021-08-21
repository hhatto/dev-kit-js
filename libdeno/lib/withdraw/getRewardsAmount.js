import { execute } from '../utils/execute';
export const createGetRewardsAmountCaller = (contract) => async (address) => execute({ contract, method: 'getRewardsAmount', args: [address] });
