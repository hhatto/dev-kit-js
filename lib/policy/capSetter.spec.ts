import Web3 from 'web3'
import { createCapSetterCaller } from './capSetter'
import { addresses } from '../addresses'
import { contractFactory } from '../contract'
import { policyAbi } from './abi'

describe('capSetter.spec.ts', () => {
	describe('createCapSetterCaller', () => {
		it('call success', async () => {
			const value = '1111'

			const contract = {
				methods: {
					capSetter: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCapSetterCaller(contract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				methods: {
					capSetter: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCapSetterCaller(contract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})

		const itif = (condition: boolean): any => (condition ? it : it.skip)
		const { WEB3_PROVIDER } = process.env
		itif(WEB3_PROVIDER !== undefined)('call success with', async () => {
			const web3 = new Web3(WEB3_PROVIDER || '')
			const client = contractFactory(web3.currentProvider)
			const address = await client
				.registry(addresses.eth['main']?.registry)
				['policy']()
			const policyContract = new web3.eth.Contract([...policyAbi], address, {})

			const caller = createCapSetterCaller(policyContract as any)
			const result = await caller()

			expect(result.startsWith('0x')).toEqual(true)
		})
	})
})
