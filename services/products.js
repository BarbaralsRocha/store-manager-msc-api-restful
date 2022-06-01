const productsModel = require('../models/products');

const getProducts = async (id = null) => {
    if (id) {
        const [rows] = await productsModel.getById(id);
        console.log(rows);
        return { message: rows[0] };
    }
    const [rows] = await productsModel.getAll();
    console.log(rows);
    return { message: rows };
};

const createProducts = async ({ name, quantity }) => {
    const checkProducts = await productsModel.checkProducts(name);
    if (checkProducts) {
        return { message: null };
    }
    const [result] = await productsModel.addProducts(name, quantity);
    return { 
            message: {
        id: result.insertId,
        name,
        quantity,
    } };
};

const updateProducts = async (id, { name, quantity }) => {
    const result = await productsModel.update(id, name, quantity);
    console.log(result);
    if (!result) {
        return { message: null };
    }
    return { message: { id, name, quantity } };
};

const deleteProducts = async (id) => {
    const result = await productsModel.deleteProduct(id);
    return { message: result };
};

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
};