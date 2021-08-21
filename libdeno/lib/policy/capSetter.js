import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createCapSetterCaller = (contract) => always(execute({
    contract,
    method: 'capSetter',
}));
