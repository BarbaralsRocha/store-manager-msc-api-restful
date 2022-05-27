const salesModel = require('../models/sales');

const getSales = (id = null) => {
    if (id) {
        return salesModel.getById(id);
    }
    return salesModel.getAll();
};

const createSales = async (body) => {
    const idSales = await salesModel.addSalesNow();
    await Promise.all(body.map((sales) => salesModel.addSalesProducts(idSales, sales)));
    return {
        id: idSales,
        itemsSold: body,
    };
};

const updateSales = async (id, productId, quantity) => {
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

module.exports = {
    getSales,
    createSales,
    updateSales,
    deleteSales,
};