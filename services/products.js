const productsModel = require('../models/products');

const getProducts = async (id = null) => {
    if (id) {
        const [rows] = await productsModel.getById(id);
        return { status: 200, message: rows[0] };
    }
    const [rows] = await productsModel.getAll();
    console.log({ status: 200, message: rows });
    return { status: 200, message: rows };
};

const createProducts = async ({ name, quantity }) => {
    const checkProducts = await productsModel.checkProducts(name);
    if (checkProducts) {
        return { message: null };
    }
    const [result] = await productsModel.addProducts(name, quantity);
    return { status: 201,
            message: {
        id: result.insertId,
        name,
        quantity,
    } };
};

const updateProducts = async (id, { name, quantity }) => {
    const result = await productsModel.update(id, name, quantity);
    if (!result) {
        return { status: 404, message: null };
    }
    return { status: 200, message: { id, name, quantity } };
};

const deleteProducts = async (id) => {
    const result = await productsModel.deleteProduct(id);
    return { status: 204, message: result };
};

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
};