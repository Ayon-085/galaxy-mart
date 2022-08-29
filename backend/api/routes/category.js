const express = require('express');
const { auth, checkAdmin } = require('../middleware/auth');
const {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require('../controller/categoryController');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images');
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', getCategories);
router.post(
  '/create-category',
  auth,
  checkAdmin,
  upload.single('image'),
  createCategory
);
router.put(
  '/update/:id',
  auth,
  checkAdmin,
  upload.single('image'),
  updateCategories
);
router.delete('/:id', auth, checkAdmin, deleteCategories);
//router.delete('/category/:id', auth, checkAdmin, categoryController.deleteCategory);

module.exports = router;
