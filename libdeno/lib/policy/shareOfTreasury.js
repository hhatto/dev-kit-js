import { execute } from '../utils/execute';
export const createShareOfTreasuryCaller = (contract) => async (supply) => execute({
    contract,
    method: 'shareOfTreasury',
    args: [supply],
});
