
// const { User } = require("../controller/user");

const User = require('../Models/user');
const {error} = require("../helper/baseResponse")


const registerValidate = async (req, res, next) => {
    try {
      const { username, email, password, cnfpassword } = req.body;
      const isEmailExist = await User.findOne({ email });
      const isUserExist = await User.findOne({ username });
  
      if (!username) return res.status(422).json(error("Username is required", 422));
      if (!email) return res.status(422).json(error("Email is required", 422));
      if (!password) return res.status(422).json(error("Password is required", 422));
  
      if (isUserExist) return res.status(422).json(error(`User with this username: ${username} already exists`, 422));
      if (isEmailExist) return res.status(422).json(error(`User with this email: ${email} already exists`, 422));
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json(error("Internal Server Error", 500));
    }
  };
  



const loginValidate = (req,res,next) =>{ 
    try{
        const {email, password} = req.body;
        //validations
        if(!email) return res.status(422).json(error("email is required", 422));
        else if(!password) return res.status(422).json(error("password is required", 422));
        // const isValidUser = user.filter((user)=>user.email === email);
        // if(isValidUser.length === 0 )return res.status(422).json(error(`User with this eamil: ${email}, doesn't created any account`, 422))
        else next()
          
    }
    catch(err){
        return res.status(500).json(error(err.message, 500))
    }
}


module.exports = {registerValidate , loginValidate}

