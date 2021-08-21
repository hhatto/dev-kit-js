import { always } from 'ramda';
import { propertyAbi } from './abi';
import { createAuthorCaller } from './author';
import { createChangeAuthorCaller } from './changeAuthor';
import { createChangeNameCaller } from './changeName';
import { createChangeSymbolCaller } from './changeSymbol';
import { createTransferCaller } from './../erc20/transfer';
import { createNameCaller } from './../erc20/name';
import { createSymbolCaller } from './../erc20/symbol';
import { createTotalSupplyCaller } from './../erc20/totalSupply';
import { createDecimalsCaller } from './../erc20/decimals';
import { createTransferFromCaller } from '../erc20/transferFrom';
import { createBalanceOfCaller } from './../erc20/balanceOf';
import { createApproveCaller } from './../erc20/approve';
import { createAllowanceCaller } from './../erc20/allowance';
export const createPropertyContract = (client) => (address, options) => {
    const contractClient = new client.eth.Contract([...propertyAbi], address, {
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
        author: createAuthorCaller(contractClient),
        changeAuthor: createChangeAuthorCaller(contractClient, client),
        changeName: createChangeNameCaller(contractClient, client),
        changeSymbol: createChangeSymbolCaller(contractClient, client),
        contract: always(contractClient),
    };
};
