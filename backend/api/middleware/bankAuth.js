const jwt = require('jsonwebtoken');
const bankAuth = (req, res, next)=>{

    const { authorization } = req.headers;

    try{
        const token = authorization.split(' ')[1] || req.cookies.access_token;
        
        //const token = req.cookies.access_token;
        //console.log(token);

        if(!token){
            return res.status(403).json({messagess :'token not found'});
        }

        
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY,(err, decode)=>{
            if(err){
                res.status(401).json({messageinAuth: err});
            }
            else{
                console.log("decoded", decode);
                console.log("email", decode.email);
                // req.bank.email = decode.email;
                // req.bank.user_id = decode.user_id;
                // req.bank.name = decode.name;
                // req.bank.user_name = decode.user_name;
                // req.accountNumber = decode.accountNumber;
                // req.bank.role = decode.role;
                // req.bank.user = decode;
                req.bankEmail = decode.email;
                req.bankUser_id = decode.user_id;
                //console.log("bank_id",req.bankUser_id);
                req.name = decode.name;
                req.bankUser_name = decode.user_name;
                req.bankAccountNumber = decode.accountNumber;
                req.bankRole = decode.role;
                req.bankUser = decode;
                console.log("bankUser", req.bankUser);
            }
        });
        // console.log("decoded",decoded);
        next();
    }catch(err){
        console.log("error+", err);
        next('Authentication Failure!!');
    }
};

const checkAdmin = (req, res, next) => {
    if(req.bankUser.role != 'admin'){
        return res.status(400).json({ message: 'Access Denied'});
    }
    next();
};

const checkUser = (req, res, next)=>{
    if(req.bankUser.role != 'user'){
        return res.status(400).json({ message: "Access denied"});
    }
    next();
};



module.exports = {bankAuth, checkAdmin, checkUser};