const mongoose = require('mongoose');

const trx = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        supplier: [{
            id: {
                type: String,
                required: true
            },
            bankAcc:{
                type: String
            },
            amount: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number
            }
            // status: {
            //     type: String,
            //     default: 'unpaid'
            // }
        }],
        products:[{
            id: {
                type: String,
                required: true
            },
            supplier_id: {
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            status: {
                type: String,
                default: 'unpaid'
            }
        }],
        trx_history: [{
            id: String,
            amount: Number,
            from: String,
            to: String
        }],
        trx_id: [{
            type: String
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('admin_supplier_trx', trx);