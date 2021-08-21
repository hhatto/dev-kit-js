import { execute } from '../utils/execute';
import { waitForCreateMetrics } from '../utils/waitForCreateMetrics';
import { always } from 'ramda';
export const createCreateAndAuthenticateCaller = (contract, client) => async (name, symbol, marketAddress, args, { metricsFactory }) => {
    const transaction = await execute({
        contract,
        method: 'createAndAuthenticate',
        args: [name, symbol, marketAddress, ...args],
        mutation: true,
        padEnd: 6,
        client,
    });
    const property = transaction.events.Create.returnValues
        ._property;
    return {
        property,
        transaction,
        waitForAuthentication: always(waitForCreateMetrics(client, property, metricsFactory)),
    };
};
