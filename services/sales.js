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

const getSales = async (id = null) => {
    if (id) {
        const [rows] = await salesModel.getById(id);
        // console.log('rows',rows.map(changeSnakeById))
        return { result: rows.map(changeSnakeById) };
    }
    const [rows] = await salesModel.getAll();
    // console.log(await salesModel.getAll());
    const sales = rows.map(changeSnake);
    return { result: sales };
};

const createSales = async (body) => {
    console.log(body);
    const idSales = await salesModel.addSalesNow();
    const result = await Promise.all(body.map((sales) => (
    salesModel.addSalesProducts(idSales, sales))));
    console.log('add', result);
    if (result.includes(null)) {
        return { result: null };
    } 
    await salesModel.stockProduct(body[0].productId, idSales);
    return { result: {
        id: idSales,
        itemsSold: body,
        } };
};

const updateSales = async (id, body) => {
    const [{ productId, quantity }] = body;
    const result = await salesModel.update(id, productId, quantity);
    if (!result) {
        return { result: null };
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
    return { result: itemUpdate };
};

const deleteSales = async (id) => {
    const result = await salesModel.deleteSales(id);
    if (!result) return { result: null };
    return { result: '' }; 
};

module.exports = {
    getSales,
    createSales,
    updateSales,
    deleteSales,
};