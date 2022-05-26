const connection = require('../db');

const getAll = () => (
    connection.execute('SELECT * FROM products;')
);

const getById = async (id) => {
    const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return result;
};

const addProducts = async (name, quantity) => {
    const [product] = await connection.execute(
        'INSERT INTO products (name, quantity) VALUES (?,?);', [name, quantity],
      );
    const result = {
        id: product.insertId,
        name,
        quantity,
    };
    return result;
};

const checkProducts = async (name) => {
    const [result] = await connection.execute('SELECT * FROM products WHERE name = ?;', [name]);
    console.log(result.length);
    return result.length;
};

const update = async (id, name, quantity) => {
    const [result] = await connection.execute(
      `UPDATE products
        SET name = ?, quantity = ?
        WHERE id = ?`,
      [name, quantity, id],
    );
    return result.affectedRows;
};

module.exports = { 
    getAll,
    getById,
    addProducts,
    checkProducts,
    update,
};