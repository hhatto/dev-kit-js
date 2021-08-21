import { getAccount } from './getAccount';
import { txPromisify } from './txPromisify';
const pad = (args, index) => ((fn) => fn([], args[0], 0, fn))((arr, v, i, fn) => i < index ? fn(arr.concat(v ?? ''), args[i + 1], i + 1, fn) : arr);
export const execute = async ({ contract, method, args, mutation, client, padEnd, }) => {
    const m = contract.methods[method];
    const a = args !== undefined && padEnd !== undefined ? pad(args, padEnd) : args;
    const x = a ? m(...a) : m();
    return mutation === true
        ? txPromisify(x.send({ from: await getAccount(client) })).then((receipt) => receipt)
        : client
            ? x.call({ from: await getAccount(client) })
            : x.call();
};
