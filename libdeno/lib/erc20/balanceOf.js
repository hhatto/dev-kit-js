import { execute } from '../utils/execute';
export const createBalanceOfCaller = (contract) => async (address) => execute({ contract, method: 'balanceOf', args: [address] });
