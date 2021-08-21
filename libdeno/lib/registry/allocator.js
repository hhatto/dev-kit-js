import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createAllocatorCaller = (contract) => always(execute({ contract, method: 'allocator' }));
