import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createMetricsFactoryCaller = (contract) => always(execute({ contract, method: 'metricsFactory' }));
