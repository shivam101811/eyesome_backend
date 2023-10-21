const {error , success} = require("../helper/baseResponse");
const ProductModel = require('../Models/product');
const categoryModel = require('../Models/category');


// create  category api ====> 

const createProduct = async (req, res) =>{
    try{
        const {name,desc,rating,price,descPercentage,gender,brand,image,weight,categoryName} = req.body;
        if(!name) return res.status(422).json(error("Name is required!" , 422))
        else if(!desc) return res.status(422).json(error("Desc is required!") , 422)
        else if(!rating) return res.status(422).json(error("Raing is required!") , 422)
        else if(!price) return res.status(422).json(error("Price is required!") , 422)
        else if(!descPercentage) return res.status(422).json(error("DescPercentage is required!") , 422)
        else if(!gender) return res.status(422).json(error("Gender is required!") , 422)
        else if(!brand) return res.status(422).json(error("Brand is required!") , 422)
        else if(!image) return res.status(422).json(error("Image is required!") , 422)
        else if(!weight) return res.status(422).json(error("Weight is required!") , 422)
        else if(!categoryName) return res.status(422).json(error("categoryName is required!") , 422)
        else{
            const isValidCategoryId = await categoryModel.find({name : categoryName})
            if(isValidCategoryId.length === 0) return res.send("invalid category")
            else{
                 const newProduct = new ProductModel(req.body);
                 await newProduct.save()

                 return res.status(201).json(success(`${name} created successfully`, newProduct , 201))
            }  
        }
        // console.log(req.body);

    }
    catch(err){
        return res.status(500).json(error(err.message , 500))
    }
}

const getAllProduct = async(req, res) => {
    try{
        const fetchAllProducts = await ProductModel.find();
        return res.status(200).json(success("fetched successfully", fetchAllProducts, 200))
    }catch(err){
        return res.status(500).json(error(err.message, 500))
    }
}


//filter api =======================================>

const getProductByCategoryName = async(req , res) => {
    try{
        const {name} = req.body 
        if(!name) return res.status(422).json(error("Category name is required !", 422))
        else{
            const products = await ProductModel.find({categoryName : name});
            console.log(products);
            if(products.length === 0) return res.status(422).json(error("there is no category by this name" , 422 ))
            else return res.status(200).json(success("fetched successfully", products, 200))
           
        }
    }catch(err){

    }
}



const getProductByGender = async(req, res) => {
    try{
        const {gender} = req.body;
        if(!gender) return  res.status(422).json(error("Gender is required!", 422));
        else{
            const products = await ProductModel.find({ gender});
            if(products.length === 0) return res.status(422).json((error("there is no gender by this name" , 422)));
            else { return res.status(200).json(success("fetched successfully" , products , 200))};
        }
    }catch(err){
        return res.status(500).json(error(err.message, 500))
    }
}

const ProductTrending = async(req,res) =>{
    try{
        const {isTrending} = req.body;
        if(isTrending === undefined) return res.status(422).json(error("isTrending is required", 422))
        else{
            const products = await ProductModel.find({isTrending});
            if(!products || products.length === 0) return res.status(422).json((error("For now, there is no trending product.", 204)))
            else{
                return res.status(200).json((success("fetched successfully" , products ,200)))
            }
        }
    }catch(err){
    return res.status(500).json(error(err.message , 500))
    }
} 


const getProductTrending = async (req, res) => {
    try {
        const fetchAllProducts = await ProductModel.find({ isTrending: true });
        return res.status(200).json(success("fetched successfully", fetchAllProducts, 200));
    } catch (err) {
        return res.status(500).json(error(err.message, 500));
    }
};




module.exports = {createProduct , getAllProduct , getProductByCategoryName , getProductByGender ,getProductTrending , ProductTrending } 




