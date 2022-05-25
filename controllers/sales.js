const express = require('express');
const sales = require('../services/sales');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', async (_req, res) => {
    const rows = await sales.getSales();
    return res.status(200).json(rows);
});

routes.use(middlewares.errorHandler);

module.exports = routes;