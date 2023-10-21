const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
 
    
  name : {
    type: String ,
    required : [true , "Product name is required"] ,
    unique : [true , "Product name must be unique"]
  },
  desc: {
    type: String,
    required: [true, "Desc is required"],
    minLength:[200 , "minimum 200 character required"]
  },
  price: {
    type: Number,
    required: [true, "rating is required"],
    min:[1, "price should not be less then 0"]
  },
  rating:{
    type: Number,
    required: [true, "price is required"],
    min:1,
    max:5
  },
  descPercentage: {
    type: Number,
    default : 0,
    max : [100, "message"],
    min : 0
  },
  gender:{
    type: String,
    required: [true, "gender is required"]
  },
  brand: {
    type: String,
    required: [true, "brand is required"]
  },
  image: {
    type: String,
    required: [true, "image is required"]
  },
  weight: {
    type: String,
    required: [true, "weight is required"]
  },
  categoryName: {
    type: String,
    required: [true, "categoryName is required"]
  },
  isTrending : Boolean
},
{
    timestamp: true
})


module.exports = Product = mongoose.model('product' , userSchema) // here you just have to write the title name of your data