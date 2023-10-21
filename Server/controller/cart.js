const { error, success } = require("../helper/baseResponse")

const cartModel = require("../Models/cart");
const UserModel = require("../Models/user");
require("dotenv").config()

//create category api ====> 

const createCart = async (req, res) => {
    try {
        const { userID, products } = req.body;
        if (!userID) return res.status(422).json(error("user id is required", 422))
        else if (!products) return res.status(422).json(error("Product is required", 422))
        let cart = await cartModel.findOne({ userID: userID })

        //if that user cart exists
        if (cart) {
            let itemIndex = cart.products.findIndex(p => `${p.productID}` === `${products[0].productID}`);

            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                const newQuantity = parseInt(productItem.quantity) + parseInt(products[0].quantity);

                if (newQuantity <= 0) {
                    // Remove the product from the cart
                    cart.products.splice(itemIndex, 1);
                } else {
                    // Update the product quantity
                    productItem.quantity = newQuantity;
                    cart.products[itemIndex] = productItem;
                }
            } else {
                console.log("product is not duplicate");
                // Add the new product to the cart's products array
                cart.products.push(products[0]);
            }

            // Save the updated cart
            await cart.save();

            if (cart.products.length === 0) {
                // If there are no more products in the cart, remove the cart
                await cartModel.findOneAndRemove({ userID: userID });
            }

            return res.status(200).json({ status: "success", message: "Cart updated" });
        } else {
            // Create a new cart for the user
            const newCart = cartModel({ userID, products });
            await newCart.save();
            return res.status(200).json({ status: "success", message: "Cart created" });
        }
    } catch (err) {
        return res.status(500).json(error(err.message, 500));
    }
}




const getCart = async (req, res) => {
    try {
        const { userID } = req.params; // Assuming the userID is passed as a parameter
        if (!userID) return res.status(422).json(error("userID is required!", 422));

        const cart = await cartModel.findOne({ userID });

        if (!cart) return res.status(404).json(error("Cart not found with this user!", 404));

        // Return the cart's products
        return res.status(200).json(success("Products fetched successfully!", cart.products, 200));
    } catch (err) {
        return res.status(500).json(error(err.message, 500));
    }
}



const removeFromCart = async (req, res) => {
    try {
        const { userID, productID } = req.body; // Assuming userID and productID are passed in the request body
        if (!userID) return res.status(422).json(error("userID is required!", 422));
        if (!productID) return res.status(422).json(error("productID is required!", 422));

        const cart = await cartModel.findOne({ userID });
        console.log(cart, "this is cart")
        if (!cart) return res.status(404).json(error("Cart not found with this user!", 404));

        const itemIndex = cart.products.findIndex((p) => `${p.productID}` === `${productID}`);
        if (itemIndex === -1) {
            return res.status(404).json(error("Product not found in the cart!", 404));
        }

        cart.products.splice(itemIndex, 1); // Remove the product from the cart

        // Save the updated cart
        await cart.save();

        if (cart.products.length === 0) {
            // If there are no more products in the cart, remove the cart
            await cartModel.findOneAndRemove({ userID });
        }

        return res.status(200).json(success("Product removed from the cart successfully!", cart.products, 200));
    } catch (err) {
        return res.status(500).json(error(err.message, 500));
    }
};



module.exports = { createCart , getCart ,removeFromCart}



