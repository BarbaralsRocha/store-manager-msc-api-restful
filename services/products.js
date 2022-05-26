const productsModel = require('../models/products');

const getProducts = (id = null) => {
    if (id) {
        return productsModel.getById(id);
    }
    return productsModel.getAll();
};

const createProducts = ({ name, quantity }) => productsModel.addProducts(name, quantity);

const repeatProduct = (name) => productsModel.checkProducts(name);

const updateProducts = (id, { name, quantity }) => productsModel.update(id, name, quantity);

module.exports = {
    getProducts,
    createProducts,
    repeatProduct,
    updateProducts,
};