const express = require('express');
const router = express.Router();
const { get_cart, add_to_cart, delete_item} = require('../controller/cartController');
const { auth, checkConsumer } = require('../middleware/auth');

router.get('/', auth, checkConsumer, get_cart);
router.post('/', auth, checkConsumer, add_to_cart);
router.delete('/:item_id', auth, checkConsumer, delete_item);

module.exports = router;
