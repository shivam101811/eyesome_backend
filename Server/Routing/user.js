const express = require('express');
const { register, login, getAllUser } = require('../controller/user');
const {registerValidate , loginValidate} = require('../validation/user');
const route = express();



//user api's

route.post('/register', registerValidate, register); 
route.post('/login', loginValidate , login);
route.get('/getAllUser', getAllUser);

module.exports = route

