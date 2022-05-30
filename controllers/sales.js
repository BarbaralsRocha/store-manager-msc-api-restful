const sales = require('../services/sales');

const getSales = async (_req, res) => {
    const rows = await sales.getSales();
    return res.status(200).json(rows);
};

const getSalesById = async (req, res) => {
        const rows = await sales.getSales(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Sale not found' }); 
        }
        return res.status(200).json(rows);
};

const createSale = async (req, res) => {
    const result = await sales.createSales(req.body);
    if (result.status === 422) {
        return res.status(result.status).json({ message: result.message });
    }
    await sales.stockSales(result.sales.itemsSold[0].productId, result.sales.id);
    return res.status(result.status).json(result.sales);
};

const updateSale = async (req, res) => {
    const [{ productId, quantity }] = req.body;
    const result = await sales.updateSales(+req.params.id, productId, quantity);
    if (result) {
      return res.status(200).json(result); 
    }
    return res.status(404).json({ message: 'Sale not found' });
};

const deleteSale = async (req, res) => {
    const result = await sales.deleteSales(req.params.id);
    if (result) {
      return res.status(204).json(); 
    }
    return res.status(404).json({ message: 'Sale not found' });
};

module.exports = {
    getSales,
    getSalesById,
    createSale,
    updateSale,
    deleteSale,
};