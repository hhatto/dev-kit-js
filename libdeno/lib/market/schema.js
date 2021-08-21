import { execute } from '../utils/execute';
import { always } from 'ramda';
export const createSchemaCaller = (contract) => always(execute({ contract, method: 'schema' }).then((result) => JSON.parse(result
    .split(`'`)
    .map((v) => ({ v, s: /[[\],:]/.test(v) }))
    .reduce((a, c) => `${a}${c.s ? c.v : `"${c.v}"`}`, ''))));
