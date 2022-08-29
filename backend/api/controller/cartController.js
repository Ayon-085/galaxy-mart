const cartModel = require('../model/cartModel');
const productModel = require('../model/productModel');

const get_cart = async (req, res)=>{
    const user_id = req.user_id;
    try{
        let cart = await cartModel.findOne({user_id});
        if(cart && cart.items.length>0){
            res.status(201).json({cart: cart});
        }else {
            res.status(400).json({message: 'cart not found'});
        }

    } catch(error){
        res.status(500).json({message : " Something is wrong "}, {error: error});
    }
};

const add_to_cart = async(req, res)=>{
    const user_id = req.user_id;
    //const { productId, quantity } = req.body;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    console.log("productId",productId);
    console.log("quantity",quantity);
    
    try{
        let cart = await cartModel.findOne({user_id});
        let product = await productModel.findOne({_id: productId});
        console.log("ppp", product);
        console.log(productId);
        if(!product){
            res.status(404).json({message: 'Product not found'});
        }
        const price = product.price;
        const name = product.name;        
        if(cart){

            let index = cart.items.findIndex(product=> product.productId == productId);

            if(index > -1){
                let item = cart.items[index];
                item.quantity += quantity;
                cart.items[index] = item;
            } else {
                cart.items.push({ productId, name, quantity, price });
            }
            cart.bill += quantity * price;
            await cart.save();
            res.status(201).json({ cart: cart});
        } else {
            const cart = new cartModel({
                createdBy: req.user_id,
                items: [{ productId, name, quantity, price}],
                bill: quantity * price
            });
            await cart.save();
            res.status(201).json({cart: cart});
        }
    }catch(error){
        res.status(500).json({error: error});
    }
};



const delete_item = async (req, res)=>{
    const user_id = req.user_id;
    const productId = req.params.item_id;
    try{
        let cart = await cartModel.findOne({user_id});
        let index = await cart.items.findIndex(item=>item.productId == productId);
        if(index > -1){
            let item = cart.items[index];
            let quantity = item.quantity;
            let price = item.price;
            cart.bill -= quantity * price;
            cart.items.splice(index, 1);
        }
        await cart.save();
        res.status(201).json({cart: cart});
    } catch(error){
        res.status(500).json({error: error});
    }
}; 
module.exports = {get_cart, add_to_cart, delete_item};