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
        console.log(rows);
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
    if (result.status === 422) {
        return res.status(result.status).json({ message: result.message });
    }
    await sales.stockSales(result.sales.itemsSold[0].productId, result.sales.id);
    return res.status(result.status).json(result.sales);
});

routes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    const result = await sales.updateSales(+id, productId, quantity);
    console.log(result);
    if (result) {
      return res.status(200).json(result); 
    }
    res.status(404).json({ message: 'Sale not found' });
});

routes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await sales.deleteSales(id);
    if (result) {
      return res.status(204).json(result); 
    }
    res.status(404).json({ message: 'Sale not found' });
});

routes.use(middlewares.errorHandler);

module.exports = routes;