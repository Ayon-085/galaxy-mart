const productModel = require('../model/productModel');
const mongoose = require('mongoose');
//const shortid = require('shortid');
const slugify = require('slugify');

const post_items = async(req, res, next)=>{
    //res.status(200).json({file: req.files, body: req.body});

    const {name, description, price, category, countInStock} = req.body;

    let images = [];

    if(req.files.length > 0){
        images = req.files.map(file=>{
            return {img: file.filename};
        });
    }
    const product = new productModel({
        name: name,
        slug: slugify(name),
        price: price,
        description,
        images,
        category,
        supplier: req.user_id,
        countInStock
    });

    console.log(product);
    await product.save((error, product)=>{
        if(error) return res.status(400).json({messagesss: error.message});
        if(product){
            res.status(200).json({product});
        }
    });
};

const get_items = async(req, res, next)=>{
    const products = await productModel.find({});
    if(products){
        res.status(200).json({products: products});
    }else{
        res.status(401).json({message: "Failed request..."});
    }
};

const get_item = async(req, res, next)=>{
    try{
        const _id = req.params.id;
        //const _id = req.body.productId;
        //const product = await productModel.findById(_id);
        const product = await productModel.findOne({_id});
        console.log(product);
        if(!product){
            res.status(401).json({message: 'items not found by id...'});
            return;
        }
        res.status(200).json({
            product: product
        });
    } catch( error ){
        res.status(400).json({error: error});
    }
};

const update_item = async(req, res)=>{
    const _id = req.params.id;
    const {price, description, countInStock} = req.body;
    const item = await productModel.findById(_id);
    
    let product = {};
    product.price = price || item.price;
    product.description = description || item.description;
    product.countInStock = countInStock || item.countInStock;

    let images = [];

    if(req.files.length > 0){
        images = req.files.map(file=>{
            return {img: file.filename};
        });
    }
    product.images = images;

    const updatedItem = await productModel.findOneAndUpdate({_id}, product, {new: true});
    return res.status(201).json({ updatedItem});
};




module.exports = {post_items, get_items, get_item, update_item};