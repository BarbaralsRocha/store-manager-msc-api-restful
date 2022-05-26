const express = require('express');
const sales = require('../services/sales');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', async (_req, res) => {
    const rows = await sales.getSales();
    return res.status(200).json(rows);
});

routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await sales.getSales(id);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Sale not found' }); 
        }
        res.status(200).json(rows);
    } catch (error) {
        res.status(404).json({ message: 'Sale not found' }); 
    }
});

routes.post('/', middlewares.validationSales, async (req, res) => {
    const result = await sales.createSales(req.body);
    return res.status(201).json(result);
});

routes.use(middlewares.errorHandler);

module.exports = routes;