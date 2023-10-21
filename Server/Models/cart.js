const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: [
            {
                productID: {
                    type: String,
                    required: true 
                },
                quantity: {
                    type: Number,
                    min: 1
                }
            }
        ]
    }
},
    {
        timestamp: true
    })


module.exports = cartModel = mongoose.model('cart', cartSchema) // here you just have to write the title name of your data