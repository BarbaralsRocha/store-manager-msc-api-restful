const connection = require('../db');

const changeRequisition = (result) => ({
    saleId: result.sale_id,
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

module.exports = {
    getAll,
};
