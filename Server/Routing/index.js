const express = require('express');
const route = express();

// user api's
const userroutes = require('./user')
const categoryroutes =require('./category')
const productroute = require('./product')
const cartroutes = require('./cart')


route.use('/user', userroutes)
route.use('/category', categoryroutes)
route.use('/product', productroute)
route.use('/cart', cartroutes)


module.exports = route 
