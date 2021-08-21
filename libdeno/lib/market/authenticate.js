import { execute } from '../utils/execute';
import { waitForCreateMetrics } from '../utils/waitForCreateMetrics';
export const createAuthenticateCaller = (contract, client) => async (propertyAddress, args, { metricsFactory }) => new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/no-expression-statement
    execute({
        contract,
        method: 'authenticate',
        mutation: true,
        client,
        args: [propertyAddress, ...args],
        padEnd: 6,
    }).catch(reject);
    // eslint-disable-next-line functional/no-expression-statement
    waitForCreateMetrics(client, propertyAddress, metricsFactory)
        .then(resolve)
        .catch(reject);
});
