import { always } from 'ramda';
import { devAbi } from './abi';
import { createTransferCaller } from './../erc20/transfer';
import { createBalanceOfCaller } from './../erc20/balanceOf';
import { createTotalSupplyCaller } from './../erc20/totalSupply';
import { createApproveCaller } from './../erc20/approve';
import { createTransferFromCaller } from '../erc20/transferFrom';
import { createNameCaller } from './../erc20/name';
import { createSymbolCaller } from './../erc20/symbol';
import { createDecimalsCaller } from './../erc20/decimals';
import { createAllowanceCaller } from './../erc20/allowance';
import { createDepositCaller } from './deposit';
export const createDevContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...devAbi], address, {
        ...options,
    });
    return {
        totalSupply: createTotalSupplyCaller(contractClient),
        balanceOf: createBalanceOfCaller(contractClient),
        transfer: createTransferCaller(contractClient, client),
        allowance: createAllowanceCaller(contractClient),
        approve: createApproveCaller(contractClient, client),
        transferFrom: createTransferFromCaller(contractClient, client),
        name: createNameCaller(contractClient),
        symbol: createSymbolCaller(contractClient),
        decimals: createDecimalsCaller(contractClient),
        deposit: createDepositCaller(contractClient, client),
        contract: always(contractClient),
    };
};
