import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createMetricsGroupCaller = (contract) => always(execute({ contract, method: 'metricsGroup' }));
