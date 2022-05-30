const express = require('express');
const products = require('../services/products');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', async (_req, res) => {
        const { status, code } = await products.getProducts();
        return res.status(status).json(code);
});

routes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, code } = await products.getProducts(id);
    return res.status(status).json(code);
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
        return res.status(404).json({ message: 'Product not found' });
});

routes.delete('/:id', async (req, res) => {
        const result = await products.deleteProducts(req.params.id);
        if (result) {
          return res.status(204).json();
        }
        return res.status(404).json({ message: 'Product not found' });
});

routes.use(middlewares.errorHandler);

module.exports = routes;