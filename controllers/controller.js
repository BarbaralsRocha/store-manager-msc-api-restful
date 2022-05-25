const express = require('express');
const products = require('../services/products');

const routes = express.Router();

routes.get('/', async (_req, res) => {
    const [rows] = await products.getProducts();
    return res.status(200).json(rows);
});