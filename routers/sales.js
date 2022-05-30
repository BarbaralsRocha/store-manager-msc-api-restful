const express = require('express');
const salesController = require('../controllers/sales');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', salesController.getSales);

routes.post('/', middlewares.validationSales, salesController.createSale);

routes.get('/:id', salesController.getSalesById);

routes.put('/:id', salesController.updateSale);

routes.delete('/:id', salesController.deleteSale);

routes.use(middlewares.errorHandler);

module.exports = routes;