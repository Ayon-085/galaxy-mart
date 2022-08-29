const express = require('express');
const router = express.Router();
const upload = require('multer')();
const {signup, login, transaction, balance_query, add_balance, test} = require('../controller/bankController');
const {bankAuth, checkAdmin, checkUser} = require('../middleware/bankAuth');


router.post('/sign-up', upload.any(), signup);
router.post('/login', upload.any(), login);
router.post('/payment', bankAuth, checkUser, transaction);
router.get('/balance', bankAuth, checkUser, balance_query);
router.post('/add_balance', upload.any(), bankAuth, checkUser, add_balance);
router.post('/test', upload.any(), test);

module.exports = router;


