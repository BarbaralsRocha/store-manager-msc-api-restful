const express = require('express');

const router = express.Router();

const productsControllers = require('../controllers/products');
const salesControllers = require('../controllers/sales');

router.use('/products', productsControllers);
router.use('/sales', salesControllers);

module.exports = router;