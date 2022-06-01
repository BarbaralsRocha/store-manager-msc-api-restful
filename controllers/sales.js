const sales = require('../services/sales');

const getSales = async (_req, res) => {
    const { result } = await sales.getSales();
    return res.status(200).json(result);
};

const getSalesById = async (req, res) => {
    const { result } = await sales.getSales(req.params.id, req, res);
    if (result.length === 0) {
        return res.status(404).json({ message: 'Sale not found' }); 
    }
    return res.status(200).json(result);
};

const createSale = async (req, res) => {
    const { result } = await sales.createSales(req.body, req, res);
    if (result === null) {
        return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }
    return res.status(201).json(result);
};

const updateSale = async (req, res) => {
    const { result } = await sales.updateSales(+req.params.id, req.body, req, res);
    if (result === null) {
        return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(result);
};

const deleteSale = async (req, res) => {
    const { result } = await sales.deleteSales(req.params.id, req, res);
    if (result === null) {
        return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(204).json();
};

module.exports = {
    getSales,
    getSalesById,
    createSale,
    updateSale,
    deleteSale,
};