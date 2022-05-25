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
module.exports = {
    getAll,
    getById,
};
