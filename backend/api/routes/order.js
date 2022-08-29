const express = require('express');
const router = express.Router();
const {checkOut, proceed, getOrders}= require('../controller/orderController');
const {auth, checkConsumer} = require('../middleware/auth');


router.get('/', getOrders);
router.post('/checkOut', auth, checkConsumer, checkOut);
router.post('/proceed', auth, checkConsumer, proceed);

module.exports = router;
