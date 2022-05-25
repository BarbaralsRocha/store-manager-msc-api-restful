const salesModel = require('../models/sales');

const getSales = () => salesModel.getAll();

module.exports = {
    getSales,
};