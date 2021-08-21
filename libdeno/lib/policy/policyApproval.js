import { execute } from '../utils/execute';
export const createPolicyApprovalCaller = (contract) => async (agree, opposite) => execute({
    contract,
    method: 'policyApproval',
    args: [agree, opposite],
});
