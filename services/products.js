const productsModel = require('../models/products');

const getProducts = (id = null) => {
    if (id) {
        return productsModel.getById(id);
    }
    return productsModel.getAll();
};

const createProducts = ({ name, quantity }) => productsModel.addProducts(name, quantity);

module.exports = {
    getProducts,
    createProducts,
};