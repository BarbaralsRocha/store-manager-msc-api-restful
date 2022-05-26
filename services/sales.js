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

module.exports = {
    getSales,
    createSales,
};