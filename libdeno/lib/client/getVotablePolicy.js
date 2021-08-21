import bent from 'bent';
import { always, not } from 'ramda';
import { aFindIndex } from 'async-ray';
import { DEV_GRAPHQL_ENDPOINT } from '../utils/const';
export const createGetVotablePolicy = (policyGroup) => {
    const fetcher = always(bent(DEV_GRAPHQL_ENDPOINT, 'POST', 'json')('/', {
        query: `{
				policy_factory_create(order_by: {block_number: desc}, limit: 100) {
					policy_address
				}
			}`,
    }).then((r) => r));
    const checker = async (policy) => policyGroup.isGroup(policy);
    // eslint-disable-next-line functional/functional-parameters
    return async () => {
        const policies = await fetcher().then(({ data }) => data.policy_factory_create);
        const policyAddresses = policies.map(({ policy_address }) => policy_address);
        const notPolicyIndex = await aFindIndex(policyAddresses, async (policy) => not(await checker(policy)));
        return policyAddresses.filter((_, i) => i < notPolicyIndex);
    };
};
