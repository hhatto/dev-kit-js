import { execute } from '../utils/execute';
export const createMarketApprovalCaller = (contract) => async (agree, opposite) => execute({
    contract,
    method: 'marketApproval',
    args: [agree, opposite],
});
