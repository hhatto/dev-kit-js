import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createPolicySetCaller = (contract) => always(execute({ contract, method: 'policySet' }));
