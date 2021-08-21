import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createAllocatorStorageCaller = (contract) => always(execute({ contract, method: 'allocatorStorage' }));
