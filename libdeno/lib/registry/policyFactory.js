import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createPolicyFactoryCaller = (contract) => always(execute({ contract, method: 'policyFactory' }));
