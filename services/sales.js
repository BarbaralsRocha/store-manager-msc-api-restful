const salesModel = require('../models/sales');

const getSales = (id = null) => {
    if (id) {
        return salesModel.getById(id);
    }
    return salesModel.getAll();
};

const createSales = async (body) => {
    const idSales = await salesModel.addSalesNow();
    const result = await Promise.all(body.map((sales) => (
        salesModel.addSalesProducts(idSales, sales))));
    console.log('result', result);
    if (result[0] === null) {
 return { status: 422, 
        message: 'Such amount is not permitted to sell', 
    }; 
} 
    return {
        status: 201, 
        sales: {
        id: idSales,
        itemsSold: body,
        },
    };
};

const updateSales = async (id, productId, quantity) => {
    console.log(await salesModel.update(id, productId, quantity));
    await salesModel.update(id, productId, quantity);
    return {
        saleId: id,
        itemUpdated: [
            {
                productId,
                quantity,
            },
        ],
    };
};

const deleteSales = (id) => salesModel.deleteSales(id);

const stockSales = (id, saleId) => salesModel.stockProduct(id, saleId);

module.exports = {
    getSales,
    createSales,
    updateSales,
    deleteSales,
    stockSales,
};