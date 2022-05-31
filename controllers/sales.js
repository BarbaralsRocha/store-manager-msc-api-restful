const sales = require('../services/sales');

const getSales = (_req, res) => sales.getSales(null, _req, res);

const getSalesById = (req, res) => sales.getSales(req.params.id, req, res);

const createSale = (req, res) => sales.createSales(req.body, req, res);

const updateSale = (req, res) => sales.updateSales(+req.params.id, req.body, req, res);

const deleteSale = (req, res) => sales.deleteSales(req.params.id, req, res);

module.exports = {
    getSales,
    getSalesById,
    createSale,
    updateSale,
    deleteSale,
};