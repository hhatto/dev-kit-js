import { policyGroupAbi } from './abi';
import { createVotingCaller } from './voting';
import { createIsGroupCaller } from './isGroup';
import { always } from 'ramda';
export const createPolicyGroupContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...policyGroupAbi], address, {
        ...options,
    });
    return {
        voting: createVotingCaller(contractClient),
        isGroup: createIsGroupCaller(contractClient),
        contract: always(contractClient),
    };
};
