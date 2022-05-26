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
    const { name } = req.body;
    const result = await products.createProducts(req.body);
    if (await products.repeatProduct(name) === 1) {
        return res.status(201).json(result);
    }
        return res.status(409).json({ message: 'Product already exists' });
});

routes.put('/:id', middlewares.validationProducts, async (req, res) => {
        const { id } = req.params;
        const { name, quantity } = req.body;
        const result = await products.updateProducts(id, req.body);
        if (result) {
          return res.status(200).json({ id, name, quantity }); 
        }
        res.status(404).json({ message: 'Product not found' });
});

routes.use(middlewares.errorHandler);

module.exports = routes;