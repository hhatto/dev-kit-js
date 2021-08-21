import { marketAbi } from './abi';
import { createSchemaCaller } from './schema';
import { createVoteCaller } from './vote';
import { createBehaviorCaller } from './behavior';
import { createAuthenticateCaller } from './authenticate';
import { always } from 'ramda';
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMarketContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...marketAbi], address, {
        ...options,
    });
    return {
        behavior: createBehaviorCaller(contractClient),
        schema: createSchemaCaller(contractClient),
        vote: createVoteCaller(contractClient, client),
        authenticate: createAuthenticateCaller(contractClient, client),
        contract: always(contractClient),
    };
};
