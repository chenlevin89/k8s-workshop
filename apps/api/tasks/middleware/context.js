const {v4: uuidv4} = require('uuid');
const asyncLocalStorage = require('../utils/asyncLocalStorage');

const HEADERS = ['canary-version'];

const setupContext = (app) => {
    app.use((req, res, next) => {
        const id = req.get('x-correlation-id') || uuidv4();
        const headers = HEADERS.reduce((acc, header) => {
            const val = req.get(header);
            if (val) {
                acc[header] = val;
            }
            return acc;
        }, {});
        asyncLocalStorage.run({['x-correlation-id']:id, ...headers}, () => next());
    });
}

module.exports = setupContext