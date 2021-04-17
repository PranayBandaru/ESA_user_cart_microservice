'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema ({
    productId: {
        type: String,
        default: ' ',
        required: true,
    },
    productName: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Quantity cannot be negative");
        }
    },
    amount: {
        type: Number,
        validate(value) {
            if (value < 0) throw new Error("Amount cannot be Negative");
        }
    }
}, 
{ 
    _id : false 
});
const UserCartSchema = new Schema ({
    userId: {
        type: String,
        required: true,
        index: { 
            unique: true 
        }
    },
    cart: [CartSchema]
});
module.exports = mongoose.model("model", UserCartSchema);
