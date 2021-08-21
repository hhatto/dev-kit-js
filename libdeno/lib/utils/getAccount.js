const map = new WeakMap();
export const getAccount = async (web3) => (async (res) => typeof res === 'string'
    ? res
    : web3.eth
        .getAccounts()
        .then(([account]) => map.set(web3, account).get(web3)))(map.get(web3));
