import { allocatorAbi } from './abi';
import { createCalculateMaxRewardsPerBlockCaller } from './calculateMaxRewardsPerBlock';
import { always } from 'ramda';
export const createAllocatorContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...allocatorAbi], address, {
        ...options,
    });
    return {
        calculateMaxRewardsPerBlock: createCalculateMaxRewardsPerBlockCaller(contractClient),
        contract: always(contractClient),
    };
};
