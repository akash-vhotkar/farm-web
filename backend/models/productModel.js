const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter the product name"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Please Enter product description"]
    },
    price:{
        type: Number,
        required:[true, "Please enter product price"],
        maxlength:[8, "Price cannot exceed eight characters"]
    },
    rating:{
        type: Number,
        default: 0
    },
    images:[                   // commenting 
        // {        
        //     public_id:{
        //         type: String,
        //         required: false //true
        //     },
        //     url:{
        //         type: String,
        //         required:false
        //     }
        // }
    ],
    category:{
        type: String,
        required: [true, "Please Enter product category"],
    },
    stock:{
        type: Number,
        required: [true, "Please enter product stock"],
        default: 1
    },
    numberOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[ //true
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: false
            },
            name:{
                type: String,
                required:false,
            },
            rating:{
                type: Number,
                required:false
            },
            comment:{
                type: String,
                required: false
            }
        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);