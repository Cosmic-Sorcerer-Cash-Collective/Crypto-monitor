import express from 'express';

let getDataCrypto = express.Router();

getDataCrypto.get('/info/:pair', (req : express.Request, res : express.Response) => {
    const pair = req.params.pair;

    res.send(`Getting data for pair ${pair}`);
});

module.exports = getDataCrypto;