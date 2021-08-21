export const stubbedWeb3 = {
    eth: {
        async getAccounts() {
            return Promise.resolve(['0x']);
        },
    },
};
export const stubbedSendTx = (confirmationEvent = {
    name: 'Test',
    property: '_test',
    value: 'test',
}, reject = false, rejectOnConfirmation = false) => {
    const result = {
        status: true,
        events: {
            [confirmationEvent.name]: {
                event: confirmationEvent.name,
                returnValues: {
                    [confirmationEvent.property]: confirmationEvent.value,
                },
            },
        },
    };
    Promise.prototype.on = function (event, cb) {
        if (event === 'confirmation') {
            setTimeout(() => {
                if (rejectOnConfirmation) {
                    cb(0, {
                        status: false,
                    });
                }
                else {
                    cb(0, result);
                }
            }, 100);
        }
        if (event === 'error' && reject) {
            setTimeout(() => {
                cb(new Error('Transaction error'));
            }, 90);
        }
        return this;
    };
    return new Promise((resolve) => resolve(result));
};
