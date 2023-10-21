const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name :{
        type: String,
        required : [true , "category name is required"],
        unique: [true, "category name already exist !"]
    }
},
{
    timestamp: true
})

  
module.exports = categoryModel = mongoose.model('category' , categorySchema) // here you just have to write the title name of your data