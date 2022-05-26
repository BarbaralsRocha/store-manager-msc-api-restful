const express = require('express');
const products = require('../services/products');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', async (_req, res) => {
    const [rows] = await products.getProducts();
    return res.status(200).json(rows);
});

routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await products.getProducts(id);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Product not found' }); 
        }
        res.status(200).json(rows);
    } catch (error) {
        res.status(404).json({ message: 'Product not found' }); 
    }
});

routes.post('/', middlewares.validationProducts, async (req, res) => {
    const result = await products.createProducts(req.body);
    return res.status(200).json(result);
});

routes.use(middlewares.errorHandler);

module.exports = routes;