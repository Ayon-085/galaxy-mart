const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
//const config = require('config');
const bcrypt = require('bcryptjs');
//const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400).json({
      message: 'Please enter all fields!!',
    });
  }

  const _user = await userModel.findOne({ email: req.body.email });

  console.log(_user);

  if (_user) {
    return res.status(400).json({ messsage: 'User already exists.....!' });
  }

  if (!_user) {
    try {
      const hashed_password = await bcrypt.hash(req.body.password, 10);

      const user = new userModel({
        name: req.body.name,
        //user_name: req.body.user_name,
        email: req.body.email,
        password: hashed_password,
        role: req.body.role,
        //profilePicture: images 
      });
      console.log(user);
      await user.save();

      res.status(200).json({
        message: 'Sign-up was Successful !',
        user: user,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Sign-up failed !',
        error: err.message,
      });
    }
  }
};

const login = async (req, res, next) => {
  try {
    const data = await userModel.find({ email: req.body.email });
    const user = data[0];

    if (user) {
      const is_valid_password = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (is_valid_password) {
        const token = jwt.sign(
          {
            email: user.email,
            user_id: user._id,
            role: user.role
          },
          process.env.JWT_SECRET,
          { expiresIn: '60d' }
        );
       
        return res.status(200).json({
          message: 'Logged in successfully',
          token: token,
          user: user,
        });
      } else {
        res.status(401).json({
          error: 'Authentication failed!',
        });
      }
    } else {
      res.status(401).json({
        error: 'Authentication failed!',
      });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: e,
    });
  }
};

const update_user = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    console.log(user_id);
    const user = await userModel.findById(user_id);
    
    if(req.body.password){
      const hashed_password = await bcrypt.hash(req.body.password, 10) || user.password;
      user.password = hashed_password || user.password;
    }
    
    console.log(user);
      

    let images = [];

    if(req.files.length > 0){ 
        images = req.files.map(file=>{
            return {img: file.filename};
        });
    }
    console.log(images);

    
    if (user) {
      user.name = req.body.name || user.name;
      
      user.email = req.body.email || req.email;
      
      user.profilePicture = images || user.profilePicture;
      user.bankAcc = req.body.bankAcc || user.bankAcc;
      user.sec_key = req.body.sec_key || user.sec_key;

      await user.save();

      const token = jwt.sign(
        {
          email: user.email,
          user_id: user._id,
          role: user.role,
          bankAcc: user.bankAcc,
          sec_key: user.sec_key
        },
        process.env.JWT_SECRET,
        { expiresIn: '60d' }
      );

      res.status(200).json({
        token: token,
        message: 'Profile Updated!!',
        user: user,
      });
    } else {
      res.status(401).json({
        error: 'Authentication failed!',
      });
    }
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({error: err});
  }
};

module.exports = { signup, login, update_user };
