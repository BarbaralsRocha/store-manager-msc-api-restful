const express = require('express');

const router = express.Router();

const routeProducts = require('./products');
const routeSales = require('./sales');

router.use('/products', routeProducts);
router.use('/sales', routeSales);

module.exports = router;