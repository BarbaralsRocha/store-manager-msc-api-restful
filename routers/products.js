const express = require('express');
const productsController = require('../controllers/products');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', productsController.getAllProducts);

routes.post('/', middlewares.validationProducts, productsController.newProduct);

routes.get('/:id', productsController.getProductById);

routes.put('/:id', middlewares.validationProducts, productsController.updateProduct);

routes.delete('/:id', productsController.deleteProduct);

routes.use(middlewares.errorHandler);

module.exports = routes;