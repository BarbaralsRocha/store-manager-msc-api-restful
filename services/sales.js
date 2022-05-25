const salesModel = require('../models/sales');

const getSales = (id = null) => {
    if (id) {
        return salesModel.getById(id);
    }
    return salesModel.getAll();
};

module.exports = {
    getSales,
};