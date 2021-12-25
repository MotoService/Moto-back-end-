const express = require('express');
const router = express.Router();
const {getProducts,insertproduct,deleteProducts} = require('../logic/products');

router.get('/', getProducts);
router.post('/',insertproduct);
router.delete('/:id',deleteProducts);
module.exports = router;