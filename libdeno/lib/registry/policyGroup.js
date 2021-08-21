import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createPolicyGroupCaller = (contract) => always(execute({ contract, method: 'policyGroup' }));
