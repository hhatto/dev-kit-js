export const watchEvent = async ({ contract, resolver, fromBlock = 0, }) => new Promise((resolve, reject) => {
    const { events } = contract;
    // eslint-disable-next-line functional/no-expression-statement
    events.allEvents({ fromBlock, toBlock: 'latest' }, (err, e) => err
        ? reject(err)
        : resolver(e).then((res) => (res ? resolve(e) : undefined)));
});
