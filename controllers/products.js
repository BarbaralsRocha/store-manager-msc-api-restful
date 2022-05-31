const products = require('../services/products');

const getAllProducts = (req, res) => products.getProducts(null, req, res);

const getProductById = (req, res) => products.getProducts(req.params.id, req, res);

const newProduct = (req, res) => products.createProducts(req.body, req, res);

const updateProduct = async (req, res) => (
        products.updateProducts(req.params.id, req.body, req, res)
);

const deleteProduct = (req, res) => products.deleteProducts(req.params.id, req, res);

module.exports = {
        getAllProducts,
        getProductById,
        newProduct,
        updateProduct,
        deleteProduct,
};