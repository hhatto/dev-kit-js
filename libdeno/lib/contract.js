/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3';
import { createMarketContract } from './market/index';
import { createPropertyContract } from './property/index';
import { createPropertyFactoryContract } from './property-factory/index';
import { createAllocatorContract } from './allocator/index';
import { createLockupContract } from './lockup/index';
import { createDevContract } from './dev/index';
import { createWithdrawContract } from './withdraw/index';
import { createRegistryContract } from './registry/index';
import { createPolicyContract } from './policy';
import { createPolicyGroupContract } from './policy-group';
import { createMetricsContract } from './metrics';
import { createPolicyFactoryContract } from './policy-factory';
export const createDevkitContract = (client) => ({
    allocator: createAllocatorContract(client),
    market: createMarketContract(client),
    property: createPropertyContract(client),
    propertyFactory: createPropertyFactoryContract(client),
    lockup: createLockupContract(client),
    withdraw: createWithdrawContract(client),
    dev: createDevContract(client),
    registry: createRegistryContract(client),
    policy: createPolicyContract(client),
    policyGroup: createPolicyGroupContract(client),
    metrics: createMetricsContract(client),
    policyFactory: createPolicyFactoryContract(client),
});
export const contractFactory = (provider) => {
    const client = new Web3(provider);
    return createDevkitContract(client);
};
