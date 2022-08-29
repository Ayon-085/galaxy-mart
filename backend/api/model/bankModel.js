const mongoose = require('mongoose'); 

const bankSchema = new mongoose.Schema (
    {
        accountNumber: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        user_name:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        secret_keys: [],
        trx_id: [],
        password: {
            type: String,
            required: true
        },
        balance:{
            type: Number
        },
        role:{
            type: String,
            default: 'user',
        },
        trx_history: [{
            _id: { 
                type: String 
            },
            amount: {
                type: Number,
            },
            from: {
                type: String
            },
            to: {
                type: String
            }
         }, {timestamps: true}]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bank", bankSchema);
