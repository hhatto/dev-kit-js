import { addressConfigAbi } from './abi';
import { createTokenCaller } from './token';
import { createAllocatorCaller } from './allocator';
import { createAllocatorStorageCaller } from './allocatorStorage';
import { createLockupCaller } from './lockup';
import { createLockupStorageCaller } from './lockupStorage';
import { createMarketFactoryCaller } from './marketFactory';
import { createMarketGroupCaller } from './marketGroup';
import { createMetricsFactoryCaller } from './metricsFactory';
import { createMetricsGroupCaller } from './metricsGroup';
import { createPolicyCaller } from './policy';
import { createPropertyFactoryCaller } from './propertyFactory';
import { createPropertyGroupCaller } from './propertyGroup';
import { createWithdrawCaller } from './withdraw';
import { createWithdrawStorageCaller } from './withdrawStorage';
import { createPolicyFactoryCaller } from './policyFactory';
import { createPolicySetCaller } from './policySet';
import { createPolicyGroupCaller } from './policyGroup';
import { always } from 'ramda';
export const createRegistryContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...addressConfigAbi], address, {
        ...options,
    });
    return {
        allocator: createAllocatorCaller(contractClient),
        allocatorStorage: createAllocatorStorageCaller(contractClient),
        lockup: createLockupCaller(contractClient),
        lockupStorage: createLockupStorageCaller(contractClient),
        marketFactory: createMarketFactoryCaller(contractClient),
        marketGroup: createMarketGroupCaller(contractClient),
        metricsFactory: createMetricsFactoryCaller(contractClient),
        metricsGroup: createMetricsGroupCaller(contractClient),
        policy: createPolicyCaller(contractClient),
        policySet: createPolicySetCaller(contractClient),
        policyGroup: createPolicyGroupCaller(contractClient),
        policyFactory: createPolicyFactoryCaller(contractClient),
        propertyFactory: createPropertyFactoryCaller(contractClient),
        propertyGroup: createPropertyGroupCaller(contractClient),
        token: createTokenCaller(contractClient),
        withdraw: createWithdrawCaller(contractClient),
        withdrawStorage: createWithdrawStorageCaller(contractClient),
        contract: always(contractClient),
    };
};
