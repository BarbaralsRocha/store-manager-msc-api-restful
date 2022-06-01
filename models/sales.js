const connection = require('../db');

const getAll = () => connection.execute(
        `SELECT * FROM sales_products sp 
        INNER JOIN products p ON p.id = sp.product_id
        INNER JOIN sales s ON s.id = sp.sale_id;`,
        );

const getById = (id) => connection.execute(
        `SELECT sp.quantity, sp.sale_id, sp.product_id, s.date 
        FROM sales_products sp 
        INNER JOIN products p ON p.id = sp.product_id
        INNER JOIN sales s ON s.id = sp.sale_id
        WHERE sale_id = ?`, [id],
        );

const addSalesNow = async () => {
    const today = new Date(Date.now()); // freeCodeCamp
    today.toISOString(); // freeCodeCamp
    const [sales] = await connection.execute(
        'INSERT INTO sales (date) VALUES (?);', [today],
    );
    return sales.insertId;
};

const addSalesProducts = async (id, { productId, quantity }) => {
    const [quantityProduct] = await connection.execute(
        'SELECT quantity FROM products WHERE id = ?', [productId],
);
console.log('venda', quantityProduct[0].quantity - quantity);
    if (quantityProduct[0].quantity - quantity <= 0) return null;
    const [salesProducts] = await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);', 
        [id, productId, quantity],
    );
    return salesProducts.affectedRows;
};

const update = async (id, productId, quantity) => {
    const [result] = await connection.execute(
    `UPDATE sales_products 
    SET quantity = ?
    WHERE product_id = ? AND sale_id = ?;`,
      [quantity, productId, id],
    );
    return result.affectedRows;
};

const deleteSales = async (id) => {
    const [quantitySales] = await connection.execute(
        'SELECT quantity, product_id FROM sales_products WHERE sale_id = ?', [id],
);
    const [result] = await connection.execute(
      'DELETE FROM sales WHERE id = ?',
      [id],
    );
    if (!quantitySales || quantitySales.length === 0) return null;
    const [quantityProduct] = await connection.execute(
        'SELECT quantity FROM products WHERE id = ?', [quantitySales[0].product_id],
);
        const stock = quantitySales[0].quantity + quantityProduct[0].quantity;
    await connection.execute(
        `UPDATE products
        SET quantity = ?
        WHERE id = ?`, [stock, quantitySales[0].product_id],
);

    return result.affectedRows;
};

const stockProduct = async (id, saleId) => {
    const [quantityProduct] = await connection.execute(
        'SELECT quantity FROM products WHERE id = ?', [id],
);
    const [quantitySales] = await connection.execute(
        'SELECT quantity FROM sales_products WHERE product_id = ? AND sale_id = ?', [id, saleId],
);
    const map = quantitySales.map((q) => q.quantity);
    const stock = map.reduce((acc, value) => acc - value, quantityProduct[0].quantity);
    const [result] = await connection.execute(
      `UPDATE products
        SET quantity = ?
        WHERE id = ?`,
      [stock, id],
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
    stockProduct,
};

// SELECT * FROM StoreManager WHERE product_id = ? AND sale_id = ?