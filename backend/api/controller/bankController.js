const bankModel = require('../model/bankModel');
const slugify = require('slugify');
let id_generator = require('random-key-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    const { name, contact, email, password } = req.body;
    // const name = req.body.name;
    // const contact = req.body.contact;
    // const email = req.body.email;
    // const password = req.body.password;
  
    if (!name || !email || !password || !contact) {
      res.status(500).json({
        message: 'Please enter all fields!!',
      });
    }
    const _user = await bankModel.findOne({ email: req.body.email });
    console.log(name, email, password, contact);
    //console.log(_user);
  
    if (_user) {
      return res.status(400).json({ messsage: 'User already exists.....!' });
    }
    if (!_user) {
      try {
        const hashed_password = await bcrypt.hash(req.body.password, 10);
        let sec = [];
        for(let i=0; i<4; i++){
            let c = id_generator(10);
            sec.push(c);
        }
        let balance = 0;

        const user = new bankModel({
          accountNumber: id_generator(6),
          name,
          contact,
          user_name: slugify(req.body.name),
          email,
          secret_keys: sec,
          password: hashed_password,
          balance,
          role: 'user'
        });

        console.log(user);
        await user.save();
  
        res.status(200).json({
          message: 'Sign-up was Successful !',
          user: user,
        });
      } catch (err) {
        console.log("errr: ",err);
        res.status(400).json({
          err,
        });
      }
    }
};


const login = async(req, res)=>{
    try {
        const data = await bankModel.find({ email: req.body.email });
        const user = data[0];
        
        console.log(user);
        //console.log(data);
        if (user) {
          const is_valid_password = await bcrypt.compare(
            req.body.password,
            user.password
          );
          
          if (is_valid_password) {
            const token = jwt.sign(
              {
                //user_name: user[0].user_name,
                email: user.email,
                user_id: user._id,
                name: user.name,
                user_name: user.user_name,
                accountNumber: user.accountNumber,
                role: user.role
              },
              process.env.JWT_PRIVATE_KEY,
              { expiresIn: '1h' }
            );
            console.log(token);
        
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

const transaction = async(req, res, next)=>{
    const { amount, accountNumber } = req.body;

    const data = req.bankUser;
    try{
        const secret_key = req.body.sec_key;
        //const accountNumber = req.adminBankAcc;
        const sender = await bankModel.findById(data.user_id);
        const receiver = await bankModel.findOne({accountNumber: accountNumber});
        
        if(!sender || !receiver){
            res.status(400).json({message: 'something wrong'});
        } else if(sender.balance < amount){
            res.status(400).json({message: 'Not enough balance'});
        } else {
            if(sender.secret_keys.includes(secret_key)){
                sender.balance -= parseInt(amount, 10);
                receiver.balance += parseInt(amount, 10);
                trxid = id_generator(10);
                const trx = {
                    _id: trxid,
                    amount:parseInt(amount, 10),
                    from: sender.accountNumber,
                    to: receiver.accountNumber
                };
                sender.trx_history.push(trx);
                sender.trx_id.push(trxid);
                receiver.trx_history.push(trx);
                receiver.trx_id.push(trxid);
                await sender.save();
                await receiver.save();
                res.status(201).json({trx: trx});
                //next();
            } else {
                res.status(400).json({message: 'payment authentication failed'});
                //next();
            }
        }
    } catch(error){
        res.status(400).json({error: error});
    }
};

const balance_query = async(req, res)=>{
    try{
        const id = req.bankUser_id;
        const _user = await bankModel.findById(id);

        const balance = _user.balance;
        res.status(201).json({balance: balance});

    } catch(error){
        res.status(400).json({ error });
    }
};

const add_balance = async(req, res)=>{
    const { amount } = req.body;
    const id = req.bankUser_id;
    console.log("id", id);
    try{
        const _user = await bankModel.findById(id);
        // let balance = _user.balance;
        _user.balance += amount;
        await _user.save();
        res.status(201).json({user: _user});
    }catch(error){
        res.status(400).json({error});
    }
};

const test = async(req, res)=>{
    const {n1, n2, n3, n4} = req.body;
    console.log(n1, n2, n3, n4);
    res.status(201).json({message: n1,n2,n3,n4});
};

module.exports = {signup, login, transaction, balance_query, add_balance, test};
  