import { metricsGroupAbi } from './abi';
import { createTotalAuthenticatedPropertiesCaller } from './totalAuthenticatedProperties';
import { always } from 'ramda';
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMetricsGroupContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...metricsGroupAbi], address, {
        ...options,
    });
    return {
        totalAuthenticatedProperties: createTotalAuthenticatedPropertiesCaller(contractClient),
        contract: always(contractClient),
    };
};
