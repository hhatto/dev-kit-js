import { execute } from '../utils/execute';
export const createHoldersShareCaller = (contract) => async (amount, lockups) => execute({
    contract,
    method: 'holdersShare',
    args: [amount, lockups],
});
