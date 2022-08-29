const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');
const categoryRoutes = require('./api/routes/category');
const cartRoutes = require('./api/routes/cart');
const bankRoutes = require('./api/routes/bank');
const seRoutes = require('./api/routes/admin_supplier');
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/category', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/bank', bankRoutes);
app.use('/final', seRoutes);
//error handling
app.use((req, res, next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    console.log(error);
    res.json({
        message: error.message
    });
});

//handling cors
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.methods === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    }
    next();
});

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
});
  
process.on('SIGINT', function () {
// this is only called on ctrl+c, not restart
process.kill(process.pid, 'SIGINT');
});

module.exports = app;