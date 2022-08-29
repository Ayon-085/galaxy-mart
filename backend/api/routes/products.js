const express = require('express');
const router = express.Router();
const { auth, checkSupplier } = require('../middleware/auth');
const multer = require('multer');
const shortid = require('shortid');
const { post_items, get_items, get_item, update_item} = require('../controller/productController');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'../frontend/public/images');
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, shortid.generate() + '-'+ file.originalname);
    }
});

const upload = multer({ storage });
  


router.get('/', get_items);
router.post('/create_products', auth, checkSupplier, upload.array('images'), post_items);
router.get('/details/:id', get_item);
router.get('/:id', get_item);
router.put('/:id', auth, checkSupplier, upload.array('images'), update_item);



module.exports = router;
