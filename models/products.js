const connection = require('../db');

const getAll = () => (
    connection.execute('SELECT * FROM products;')
);

const getById = async (id) => {
    const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return result;
};

module.exports = { 
    getAll,
    getById,
};