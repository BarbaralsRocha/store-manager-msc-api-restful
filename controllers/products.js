const products = require('../services/products');

const getAllProducts = async (_req, res) => {
        const { status, code } = await products.getProducts();
        return res.status(status).json(code);
};

const getProductById = async (req, res) => {
        const { status, code } = await products.getProducts(req.params.id);
        return res.status(status).json(code);
};

const newProduct = async (req, res) => {
        const { name } = req.body;
        const result = await products.createProducts(req.body);
        if (await products.repeatProduct(name) === 1) {
            return res.status(201).json(result);
        }
            return res.status(409).json({ message: 'Product already exists' });
};

const updateProduct = async (req, res) => {
        const { id } = req.params;
        const { name, quantity } = req.body;
        const result = await products.updateProducts(id, req.body);
        if (result) {
          return res.status(200).json({ id, name, quantity }); 
        }
        return res.status(404).json({ message: 'Product not found' });
};

const deleteProduct = async (req, res) => {
        const result = await products.deleteProducts(req.params.id);
        if (result) {
          return res.status(204).json();
        }
        return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
        getAllProducts,
        getProductById,
        newProduct,
        updateProduct,
        deleteProduct,
};