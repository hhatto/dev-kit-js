import { execute } from '../utils/execute';
export const createGetPropertyValueCaller = (contract) => async (address) => execute({ contract, method: 'getPropertyValue', args: [address] });
