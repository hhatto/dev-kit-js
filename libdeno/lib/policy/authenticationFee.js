import { execute } from '../utils/execute';
export const createAuthenticationFeeCaller = (contract) => async (assets, propertyAssets) => execute({
    contract,
    method: 'authenticationFee',
    args: [assets, propertyAssets],
});
