import { policyAbi } from './abi';
import { always } from 'ramda';
import { createHoldersShareCaller } from './holdersShare';
import { createRewardsCaller } from './rewards';
import { createAuthenticationFeeCaller } from './authenticationFee';
import { createMarketApprovalCaller } from './marketApproval';
import { createPolicyApprovalCaller } from './policyApproval';
import { createMarketVotingBlocksCaller } from './marketVotingBlocks';
import { createPolicyVotingBlocksCaller } from './policyVotingBlocks';
import { createShareOfTreasuryCaller } from './shareOfTreasury';
import { createTreasuryCaller } from './treasury';
import { createCapSetterCaller } from './capSetter';
export const createPolicyContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...policyAbi], address, {
        ...options,
    });
    return {
        holdersShare: createHoldersShareCaller(contractClient),
        rewards: createRewardsCaller(contractClient),
        authenticationFee: createAuthenticationFeeCaller(contractClient),
        marketApproval: createMarketApprovalCaller(contractClient),
        policyApproval: createPolicyApprovalCaller(contractClient),
        marketVotingBlocks: createMarketVotingBlocksCaller(contractClient),
        policyVotingBlocks: createPolicyVotingBlocksCaller(contractClient),
        shareOfTreasury: createShareOfTreasuryCaller(contractClient),
        treasury: createTreasuryCaller(contractClient),
        capSetter: createCapSetterCaller(contractClient),
        contract: always(contractClient),
    };
};
