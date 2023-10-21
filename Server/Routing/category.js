const express = require('express');
const { createCategory, getAllCategory } = require('../controller/category');
const route = express();



//Category api's routes

route.post('/createCategory', createCategory); 
route.get('/getAllCategory/:token',getAllCategory) 

module.exports = route




