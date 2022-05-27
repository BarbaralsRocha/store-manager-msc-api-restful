const connection = require('../db');

const changeRequisition = (result) => ({
    saleId: result.sale_id,
    date: result.date,
    productId: result.product_id,
    quantity: result.quantity,
});

const changeRequisitionById = (result) => ({
    date: result.date,
    productId: result.product_id,
    quantity: result.quantity,
});

const getAll = async () => {
    const [result] = await connection.execute(
        `SELECT * FROM sales_products sp 
        INNER JOIN products p ON p.id = sp.product_id
        INNER JOIN sales s ON s.id = sp.sale_id;`,
        );
    return result.map(changeRequisition);
};

const getById = async (id) => {
    const [result] = await connection.execute(
        `SELECT * FROM sales_products sp 
        INNER JOIN products p ON p.id = sp.product_id
        INNER JOIN sales s ON s.id = sp.sale_id
        WHERE sale_id = ?`, [id],
        );
        return result.map(changeRequisitionById);
};
const addSalesNow = async () => {
    const today = new Date(Date.now()); // freeCodeCamp
    today.toISOString(); // freeCodeCamp
    const [sales] = await connection.execute(
        'INSERT INTO sales (date) VALUES (?);', [today],
    );
    return sales.insertId;
};

const addSalesProducts = async (id, { productId, quantity }) => {
    const [salesProducts] = await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);', 
        [id, productId, quantity],
    );
    return salesProducts.affectedRows;
};

const update = async (id, productId, quantity) => {
    const [result] = await connection.execute(
      `UPDATE sales_products
        SET product_id = ?, quantity = ?
        WHERE sale_id = ?`,
      [productId, quantity, id],
    );
    return result.affectedRows;
};

const deleteSales = async (id) => {
    const [result] = await connection.execute(
      `DELETE FROM sales
        WHERE id = ?`,
      [id],
    );
    return result.affectedRows;
};

module.exports = {
    getAll,
    getById,
    addSalesNow,
    addSalesProducts,
    update,
    deleteSales,
};

// {
//     id: salesProducts.insertId, 
//     itemsSold: 
// };