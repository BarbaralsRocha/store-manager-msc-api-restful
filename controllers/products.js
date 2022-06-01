const products = require('../services/products');

const getAllProducts = async (req, res) => {
       const { status, message } = await products.getProducts();
        return res.status(status).json(message);
};

const getProductById = async (req, res) => {
        const { status, message } = await products.getProducts(req.params.id);
        if (!message) {
                return res.status(404).json({ message: 'Product not found' });
        }
         return res.status(status).json(message);
};

const newProduct = async (req, res) => {
        const { status, message } = await products.createProducts(req.body);
        if (message === null) {
                return res.status(409).json({ message: 'Product already exists' });
        }
        return res.status(status).json(message);
};

const updateProduct = async (req, res) => {
        const { status, message } = await products.updateProducts(req.params.id, req.body);
        if (message === null) {
                return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(status).json(message);
};

const deleteProduct = async (req, res) => {
        const { status, message } = await products.deleteProducts(req.params.id, req, res);
        if (message === 0) {
                console.log(message);
                return res.status(404).json({ message: 'Product not found' });
        }
        console.log(message);
        return res.status(status).json(message);
};

module.exports = {
        getAllProducts,
        getProductById,
        newProduct,
        updateProduct,
        deleteProduct,
};