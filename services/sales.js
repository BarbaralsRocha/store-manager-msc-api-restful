const salesModel = require('../models/sales');

const changeSnake = (result) => ({
    saleId: result.sale_id,
    date: result.date,
    productId: result.product_id,
    quantity: result.quantity,
});

const changeSnakeById = (result) => ({
    date: result.date,
    productId: result.product_id,
    quantity: result.quantity,
});

const getSales = async (id = null, _req, res) => {
    if (id) {
        const rows = await salesModel.getById(id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Sale not found' }); 
        }
        return res.status(200).json(rows.map(changeSnakeById));
    }
    const rows = await salesModel.getAll();
    return res.status(200).json(rows.map(changeSnake));
};

const createSales = async (body, _req, res) => {
    const idSales = await salesModel.addSalesNow();
    const result = await Promise.all(body.map((sales) => (
    salesModel.addSalesProducts(idSales, sales))));
    if (result[0] === null) {
        return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    } 
    console.log('stock', await salesModel.stockProduct(body[0].productId, idSales));
    return res.status(201).json({
        id: idSales,
        itemsSold: body,
        });
};

const updateSales = async (id, body, _req, res) => {
    const [{ productId, quantity }] = body;
    const result = await salesModel.update(id, productId, quantity);
    if (!result) {
        return res.status(404).json({ message: 'Sale not found' });
    }
    const itemUpdate = {
        saleId: id,
        itemUpdated: [
            {
                productId,
                quantity,
            },
        ],
    };
    return res.status(200).json(itemUpdate);
};

const deleteSales = async (id, req, res) => {
    const result = await salesModel.deleteSales(id);
    if (!result) return res.status(404).json({ message: 'Sale not found' });
    return res.status(204).json(); 
};

module.exports = {
    getSales,
    createSales,
    updateSales,
    deleteSales,
    // stockSales,
};