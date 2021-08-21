import { propertyFactoryAbi } from './abi';
import { createCreatePropertyCaller } from './create';
import { createCreateAndAuthenticateCaller } from './createAndAuthenticate';
import { always } from 'ramda';
export const createPropertyFactoryContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...propertyFactoryAbi], address, {
        ...options,
    });
    return {
        create: createCreatePropertyCaller(contractClient, client),
        createAndAuthenticate: createCreateAndAuthenticateCaller(contractClient, client),
        contract: always(contractClient),
    };
};
