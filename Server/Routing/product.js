const express = require('express');
const { createProduct, getAllProduct ,getProductByCategoryName , getProductByGender, ProductTrending , getProductTrending} = require('../controller/product');
const route = express();



//Category api's routes

route.post('/createProduct', createProduct); 
route.get('/getAllProduct',getAllProduct) 
route.get('/getProductByCategoryName',getProductByCategoryName) 
route.post('/getProductByGender',getProductByGender) 
route.post('/isProductTrending', ProductTrending)
route.get('/getAllProuctTrending', getProductTrending)

module.exports = route 