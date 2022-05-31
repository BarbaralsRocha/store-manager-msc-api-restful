const productsModel = require('../models/products');

const getProducts = async (id = null, _req, res) => {
    if (id) {
        const [rows] = await productsModel.getById(id);
        if (!rows[0]) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(rows[0]);
    }
    const [rows] = await productsModel.getAll();
    console.log('rows', rows);
    return res.status(200).json(rows);
};

const createProducts = async ({ name, quantity }, _req, res) => {
    const checkProducts = await productsModel.checkProducts(name);
    if (checkProducts) {
        return res.status(409).json({ message: 'Product already exists' });
    }
    const [result] = await productsModel.addProducts(name, quantity);
    return res.status(201).json({
        id: result.insertId,
        name,
        quantity,
    });
};

const updateProducts = async (id, { name, quantity }, _req, res) => {
    const result = await productsModel.update(id, name, quantity);
    if (!result) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ id, name, quantity }); 
};

const deleteProducts = async (id, _req, res) => {
    const result = await productsModel.deleteProduct(id);
    if (result) {
        return res.status(204).json();
      }
      return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
};