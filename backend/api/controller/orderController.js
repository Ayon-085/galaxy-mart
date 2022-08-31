const orderModel = require('../model/orderModel');
//const config = require('config');
const bankModel = require('../model/bankModel');

const checkOut = async(req, res)=>{
    const user_id = req.user_id;
    const {items, address, city, itemsPrice, shippingPrice} = req.body;
    try{
        const shippingAddress = {
            address,
            city
        };
        // let items = [];
        
        let totalPrice = itemsPrice + shippingPrice;
        req.totalPrice = totalPrice;
        const adminBankAcc = "f0b1fk";
        const order = new orderModel({
            user: user_id,
            items,
            shippingAddress,
            itemsPrice,
            shippingPrice,
            totalPrice,
            //to_pay: adminBankAcc, 
        });
        await order.save();
        res.status(201).json({order: order, acc: adminBankAcc});
    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }
};

const proceed = async(req, res)=>{
    const {trx_id} = req.body;
    const user_id = req.user_id;
    try{
        const order = await orderModel.findOne({user: user_id});
        acc = "f0b1fk";
        const admin_bank =  await bankModel.findOne({accountNumber: acc});
        const trx = {
            id: trx_id,
            status: 'paid'
        };
        order.trx = trx;
        const d = new Date();

        if(admin_bank.trx_id.includes(trx_id)){
            order.isPaid = true;
            order.paidAt = d.setDate(d.getDate());
        }
        await order.save();
        res.status(400).json({order: order});
    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }
};

const getOrdersNotProcessedOfUser = async(req, res)=>{
    const user_id = req.user_id;
    try{
        orderModel.find({user: user_id, isPaid: true, paymentProcessed: false}).sort({date:-1}).then(orders => res.status(201).json(orders));
    } catch(error){
        console.log(error);
        res.status(400).json({error: error});
    }
};

const getOrders = async(req, res)=>{
    const userId = req.user_id;
    orderModel.find({userId}).sort({date:-1}).then(orders => res.status(201).json(orders));
};

module.exports = {checkOut, proceed, getOrders, getOrdersNotProcessedOfUser};

