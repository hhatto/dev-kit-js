import { policyFactoryAbi } from './abi';
import { always } from 'ramda';
import { createConvergePolicyCaller } from './convergePolicy';
import { createCreateCaller } from './create';
import { createForceAttachCaller } from './forceAttach';
export const createPolicyFactoryContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...policyFactoryAbi], address, {
        ...options,
    });
    return {
        create: createCreateCaller(contractClient, client),
        convergePolicy: createConvergePolicyCaller(contractClient, client),
        forceAttach: createForceAttachCaller(contractClient, client),
        contract: always(contractClient),
    };
};
