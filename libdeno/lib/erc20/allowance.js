import { execute } from '../utils/execute';
export const createAllowanceCaller = (contract) => async (from, to) => execute({
    contract,
    method: 'allowance',
    args: [from, to],
});
