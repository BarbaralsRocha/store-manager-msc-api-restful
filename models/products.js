const connection = require('../db');

const getAll = () => (
    connection.execute('SELECT * FROM products;')
);

module.exports = { getAll };