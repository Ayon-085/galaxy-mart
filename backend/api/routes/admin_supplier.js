const express = require('express');
const router = express.Router();
const {admin_checkOut, proceed, addShipment, getOrdersNotProcessed, getOrders, getUsers, getAccount, getShipment, getOrdersBySupplier} = require('../controller/admin_supp_controller');
const {auth, checkAdmin, checkSupplier} = require('../middleware/auth');

router.post('/admin_checkOut/:id', auth, checkAdmin, admin_checkOut);
router.post('/proceed', auth, checkAdmin, proceed);
router.post('/shipment/:id', auth, checkSupplier, addShipment);
router.get('/users', auth, getUsers);
router.get('/allOrders', auth, checkAdmin, getOrders);
router.get('/orders/checkout', auth, checkAdmin, getOrdersNotProcessed);
router.get('/get_acc_no/:id', auth, checkAdmin, getAccount);
router.get('/get_shipment/:id', auth, checkSupplier, getShipment);
router.get('/supplier/orders', auth, checkSupplier, getOrdersBySupplier);

module.exports = router;