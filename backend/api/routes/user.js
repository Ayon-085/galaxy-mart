const express = require('express');
const {signup, login, update_user} = require('../controller/userController');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const { auth } = require('../middleware/auth');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, shortid.generate() + '-'+ file.originalname);
    }
});

const upload = multer({ storage });

router.post('/register', upload.any(), signup);
router.post('/login', login);
router.put('/profile_update', auth, upload.array('images'), update_user);

module.exports = router;
