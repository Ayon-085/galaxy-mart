const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        slug:{
            type: String,
            required: true,
        },
        images:[
            {
                img:{
                    type: String,
                    required: true,
                }
            }
        ],
        price:{
            type: Number,
            trim: true,
            required: true
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        countInStock:{
            type: Number,
            required: true
        },
        supplier:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating:{
            type: String,
        },
        description:{
            type: String,
            required: true
        },
    },
    {
        timestamps: true 
    },
);

module.exports = mongoose.model("Products", productSchema);