const express = require('express');
const { createCart, getCart, removeFromCart } = require('../controller/cart');
const route = express();



//Category api's routes

route.post('/createCart', createCart); 
route.post('/removeFromCart', removeFromCart)
route.get('/getCart/:userID',getCart)

module.exports = route




