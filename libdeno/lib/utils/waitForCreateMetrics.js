import { metricsFactoryAbi } from '../metrics-factory/abi';
import { metricsAbi } from '../metrics/abi';
import { watchEvent } from '../utils/watchEvent';
import { execute } from './execute';
const getMetricsProperty = async (address, client) => execute({
    contract: new client.eth.Contract([...metricsAbi], address),
    method: 'property',
});
export const waitForCreateMetrics = async (client, propertyAddress, metricsFactoryAddress) => {
    const fromBlock = await client.eth.getBlockNumber();
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line functional/no-expression-statement
        watchEvent({
            fromBlock,
            contract: new client.eth.Contract([...metricsFactoryAbi], metricsFactoryAddress),
            resolver: async (e) => ((metricsAddress) => metricsAddress
                ? getMetricsProperty(metricsAddress, client)
                    .then((property) => property === propertyAddress ? true : false)
                    .catch(reject)
                : false)(e.event === 'Create' ? e.returnValues._metrics : undefined),
        })
            .then((res) => resolve(res.returnValues._metrics))
            .catch(reject);
    });
};
