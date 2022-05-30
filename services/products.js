const productsModel = require('../models/products');

const getProducts = async (id = null) => {
    if (id) {
        const [rows] = await productsModel.getById(id);
        const message = 'Product not found';
        if (!rows[0]) {
            return { status: 404, code: { message } };
        }
        return { status: 200, code: rows[0] };
    }
    const [rows] = await productsModel.getAll();
    return { status: 200, code: rows };
};

const createProducts = ({ name, quantity }) => productsModel.addProducts(name, quantity);

const repeatProduct = (name) => productsModel.checkProducts(name);

const updateProducts = (id, { name, quantity }) => productsModel.update(id, name, quantity);

const deleteProducts = (id) => productsModel.deleteProduct(id);

module.exports = {
    getProducts,
    createProducts,
    repeatProduct,
    updateProducts,
    deleteProducts,
};