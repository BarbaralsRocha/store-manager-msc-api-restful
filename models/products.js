const connection = require('../db');

const getAll = () => (
    connection.execute('SELECT * FROM products;')
);

// retorna array com obj
const getById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const addProducts = (name, quantity) => connection.execute(
        'INSERT INTO products (name, quantity) VALUES (?,?);', [name, quantity],
);

const checkProducts = async (name) => {
    const [result] = await connection.execute('SELECT * FROM products WHERE name = ?;', [name]);
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

const deleteProduct = async (id) => {
    const [result] = await connection.execute(
      `DELETE FROM products
        WHERE id = ?`,
      [id],
    );
    return result.affectedRows;
};

module.exports = { 
    getAll,
    getById,
    addProducts,
    checkProducts,
    update,
    deleteProduct,
};