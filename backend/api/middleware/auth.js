const jwt = require('jsonwebtoken');
const auth = (req, res, next)=>{

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
                console.log("decode",decode);
                // req.user_name = decode.user_name;
                req.email = decode.email;
                req.user_id = decode.user_id;
                req.role = decode.role;
                req.bankAcc = decode.bankAcc;
                req.sec_key = decode.sec_key;
                req.user = decode;
            }
        });
        next();
    }catch(err){
        console.log("error+", err);
        next('Authentication Failure!!');
    }
};

const checkAdmin = (req, res, next) => {
    if(req.role != 'admin'){
        return res.status(400).json({ message: 'Access Denied'});
    }
    next();
};

const checkConsumer = (req, res, next)=>{
    if(req.user.role != 'consumer'){
        return res.status(400).json({ message: "Access denied"});
    }
    next();
};

const checkSupplier = (req, res, next)=>{
    if(req.user.role != 'supplier'){
        return res.status(400).json({ message: "Access denied"});
    }
    next();
};



module.exports = {auth, checkAdmin, checkConsumer, checkSupplier};