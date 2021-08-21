import { metricsAbi } from './abi';
import { createPropertyCaller } from './property';
import { createMarketCaller } from './market';
import { always } from 'ramda';
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMetricsContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...metricsAbi], address, {
        ...options,
    });
    return {
        property: createPropertyCaller(contractClient),
        market: createMarketCaller(contractClient),
        contract: always(contractClient),
    };
};
