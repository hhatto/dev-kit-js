import { execute } from '../utils/execute';
export const createRewardsCaller = (contract) => async (lockups, assets) => execute({
    contract,
    method: 'rewards',
    args: [lockups, assets],
});
