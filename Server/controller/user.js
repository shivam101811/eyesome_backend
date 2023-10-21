
const {success,error} = require("../helper/baseResponse");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const sendMail = require("../helper/sendMail")
const conformOrderTemplate = require("../helper/conformOrderTemplate")
// register API
// const user = [ ];
const User = require("../Models/user")
const register = async(req,res)=>{
    //error handling
    //object distructuring
    //validation
    //return
    try{ 
        const {username , email , password , cnfpassword} = req.body ;

            const newUser = new User({
                username: username,
                email: email,
                password: password
            })
            await newUser.save()
            await sendMail(email, "Registration", `${username} has been registered`,conformOrderTemplate(username))
            responseData = success(`${username} registered successfully` , newUser, 201)
            return res.status(201).json(responseData)
        // }
    }
    catch(err){
        return res.send(err.message)
    }
}

const login= async(req,res)=>{
    try{
        const {email, password} = req.body;
         
        const isExist = await User.find({email});
        if(isExist.length === 0) return res.status(422).json(error("User with this email doesn't exist" , 422));
        else{
            if(password != isExist[0].password)  return res.status(422).json(error("Incorrect password" , 422));
           
            else {
                const payload = {
                    username : isExist[0].username,
                    isAdmin:false
                }
                const token = await jwt.sign(payload , process.env.JWT_secret_Key)


                return res.status(200).json(success("logged in successfully!", [{token, isExist}], 200))}
            
        }
       
        
    }catch(err){
        return res.send(err.message)
    }
}



const getAllUser = async(req,res)=>{
    try{
        const allUser = await User.find({});
        return res.status(200).json(success("user fetched successfully", allUser, 200))
    }
    catch(err){
        return res.status(500).json(error(err.message , 500))
    }
}

module.exports = {register , login ,User ,getAllUser } 


 



