const express = require('express');
const router = express.Router();
const {checkOut, proceed, getOrders, getOrdersNotProcessedOfUser}= require('../controller/orderController');
const {auth, checkConsumer} = require('../middleware/auth');


router.get('/', getOrders);
router.get('/users/orders', auth, getOrdersNotProcessedOfUser);
router.post('/checkOut', auth, checkConsumer, checkOut);
router.post('/proceed', auth, checkConsumer, proceed);

module.exports = router;
