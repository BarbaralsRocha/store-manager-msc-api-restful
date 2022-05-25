const express = require('express');

const router = express.Router();

const productsControllers = require('../controllers/products');

router.use('/products', productsControllers);
module.exports = router;