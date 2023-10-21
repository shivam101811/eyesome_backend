const {error, success} = require("../helper/baseResponse")

const categoryModel = require("../Models/category")
const jwt =require('jsonwebtoken')
require("dotenv").config()

//create category api ====> 

const createCategory = async(req,res) => {
    try{

        const {name} =req.body;
        if(!name) return res.status(422).json(error("Category name is required", 422))

        const isExist = await categoryModel.find({name})
        if(isExist.length != 0) return res.status(422).json(error("Category name alredy exist" , 422))
        else{
            const newCategory =await new categoryModel({name});
            newCategory.save();

            return res.status(201).json(success("Created successfully",newCategory , 201))
        }

    }catch(err){
        return res.status(500).json(error(err.message, 500))
    }
}


const getAllCategory = async(req,res) => {
    try{
        const {token} =req.params;
        if(!token) return res.status(422).json(error("Token is missing", 422));
        else{
            const isValidToken = await jwt.verify(token , process.env.JWT_Secret_Key)
            if(!isValidToken) return res.status(401).json(error("Token is invalid", 401));
            else{
                const getAllCategory = await categoryModel.find({})
                return res.status(200).json(success("fetched successfully",getAllCategory,200))
            }
        }


    }catch(err){
        return res.status(500).json(error(err.message, 500))
    }
}

module.exports = { createCategory , getAllCategory }