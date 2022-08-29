const admin_supplier_trx = require('../model/admin_supplier_trx');
const orderModel = require('../model/orderModel');
const bankModel = require('../model/bankModel');
const userModel = require('../model/userModel');
const productModel = require('../model/productModel');


const getUsers = async(req, res)=>{
    try{
        const users = await userModel.find({});
        if(users){
            res.status(201).json({users: users});
        }else {
            res.status(400).json({message: 'users not found'});
        }
    } catch(error){
        console.log(error);
        res.status(400).json({error: error});
    }
    
};

const getOrdersNotProcessed = async(req, res)=>{
    orderModel.find({isPaid: true, paymentProcessed: false}).sort({date:-1}).then(orders => res.status(201).json(orders));
};

const getOrdersBySupplier = async(req, res)=>{
    const id = req.user_id;
    try{
        const orders = await orderModel.find({"items.supplier": id, paymentProcessed: true});
        res.status(201).json({orders: orders});
    } catch(error){
        console.log(error);
        res.status(201).json({error});
    }
    // orderModel.find({"items.supplier": id, paymentProcessed: true}).then(orders=> res.status(201).json(orders));
};

const admin_checkOut = async(req, res)=>{
    //const { supplierAcc, amount } = req.body;
    const order_id = req.params.id;

    try{
        const order = await orderModel.findById(order_id);
        
        let items = order.items;
        // items.push(order.items);
        console.log("items 2",order.items[2]);
        console.log("items length", items.length);
        if(order.isPaid == true){
            let supplier = [];
            //const amount = [];
            
            for(let i=0; i<items.length; i++){
                let obj = {};
                obj.id = items[i].supplier;
                console.log("supplier: ", items[i].supplier);
                obj.amount = (items[i].price*items[i].quantity);
                supplier.push(obj);
            }
            
            console.log(supplier);
            let products = [];
            
            for(let i=0; i<items.length; i++){
                let obj1 = {};
                obj1.id = items[i].productId;
                obj1.supplier_id = items[i].supplier;
                obj1.quantity = items[i].quantity;
                products.push(obj1);
            }
            const checkOut = new admin_supplier_trx({
                order: order_id,
                supplier,
                products
            });
            await checkOut.save();
            res.status(201).json({ checkOut: checkOut  });
        } else {
            res.status(500).json({message: 'order isn\'t paid from user!'});
        }
    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }
};

const getAccount = async(req, res)=>{
    const supplier_id = req.params.id;
    try{
        const supplier = await userModel.findById(supplier_id);
        //console.log(supplier_bank);
        supplier_acc = supplier.bankAcc;
        res.status(201).json({bankAcc: supplier_acc});
    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }
    
}; 

const proceed = async(req, res)=>{
    const {trx_id, order_id, supplier_id, productId} = req.body;

    try{
        const order = await orderModel.findById(order_id);
        const admin_supplier = await admin_supplier_trx.findOne({order: order_id});
        const supplier = await userModel.findById(supplier_id);
        const supplierAcc = supplier.bankAcc;
        const supplier_bank = await bankModel.findOne({accountNumber: supplierAcc});

        const admin = await userModel.findOne({email: 'admin@gmail.com'});
        const adminAcc = admin.bankAcc;
        //const admin_bank =  await bankModel.findOne({accountNumber: adminAcc});
        console.log(admin_supplier);
        console.log("supplier", supplier);
        console.log('supplier_bank', supplier_bank);
        if(admin_supplier.supplier.length != 0){
            if(supplier_bank.trx_id.includes(trx_id)){
                let supplier = [];
                let products = [];
                let items = [];
                items = order.items;
                products = admin_supplier.products;
                supplier = admin_supplier.supplier;
                console.log("supplier",supplier);
                console.log("products",products);
                let index = supplier.findIndex((supplier)=> supplier.id == supplier_id);
                let index1 = products.findIndex((p)=>p.id == productId);
                let index2 = items.findIndex(p=>p.productId == productId);
                console.log("index", index);
                console.log("index1", index1);
                products[index1].status = 'paid';
                items[index2].status = 'paid';
                order.items = items;
                await order.save();
                console.log("amount:..",admin_supplier.supplier[index]);
                const obj = {
                    id: trx_id,
                    amount: supplier[index].amount,
                    from: adminAcc,
                    to: supplierAcc,
                };
                supplier.splice(index, 1);
                admin_supplier.supplier = supplier;
                admin_supplier.products = products;
                admin_supplier.trx_history.push(obj);
                admin_supplier.trx_id.push(obj.id);
                await admin_supplier.save();
                if(admin_supplier.supplier.length == 0){
                    order.paymentProcessed = true;  
                    await order.save();
                    res.status(201).json({order: order});
                }
                res.status(201).json({supplier: supplier});   
            } else{
                res.status(400).json({message: 'item not proceeded'});
            }
        } 
    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }
};


const getShipment = async(req, res)=>{
    const order_id = req.params.id;
    const user_id = req.user_id;
    //const {productId} = req.body;
    try{
        const admin_supplier = await admin_supplier_trx.findOne({order: order_id});
        let products = admin_supplier.products;
        console.log(products);
        const productsIndexes = products.map((elm, idx) => elm.supplier_id == user_id ? idx: '').filter(String);
        if(productsIndexes.length > 0){
            let arr = [];
            console.log("length of indice",productsIndexes.length);
            for(let i in productsIndexes){
                arr.push(products[i]); 
            }
            console.log("indices", productsIndexes);
            products = arr;
            res.status(201).json({products: products});
        } else {
            const index = products.findIndex(p=>p.supplier_id == user_id);
            const product = products[index];
            res.status(201).json({product: product});
        }
        
    } catch(error){
        console.log(error);
        res.status(201).json({error});
    }
};


const addShipment = async(req, res)=>{
    const {quantity, order_id} = req.body;
    const productId = req.params.id;
    const user_id = req.user_id;
    try{
        const product = await productModel.findById(productId);
        const order = await orderModel.findById(order_id);
        const admin_supplier = await admin_supplier_trx.findOne({order: order_id});
        let products = admin_supplier.products;
        index = products.findIndex(p=> p.id == productId);
        products.splice(index,1);
        admin_supplier.products = products;
        await admin_supplier.save();
        product.quantity -= quantity;
        order.ship.push(1);
        await order.save();
        
        const d = new Date();
        if(order.ship.length == order.items.length){
            order.isShipped = true;
            order.shippedAt = d.setDate(d.getDate());
            res.status(201).json({products: products});
        }
        const productsIndexes = products.map((elm, idx) => elm.supplier_id == user_id ? idx: '').filter(String);
        if(productsIndexes.length>0){
            let arr = [];
            for(let i in productsIndexes){
                arr.push(products[i]); 
            }
            console.log(productsIndexes);
            products = arr;
        } else {
            const index = products.findIndex(p=>p.supplier_id == user_id);
            const product = products[index];
            res.status(201).json({product: product});
        }
        
        res.status(201).json({products: products});
    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }
};


module.exports = {admin_checkOut, proceed, getAccount, getOrdersNotProcessed, getShipment, getUsers, addShipment, getOrdersBySupplier};
