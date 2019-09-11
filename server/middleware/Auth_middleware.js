import  dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import  db from '../models/user_modal';
import  message from '../helpers/message'
import {loginValidation,signupValidation} from "../helpers/joi";
dotenv.config();
class Auth_middleware 
{


  signup = async (req,res, next) =>
  {
     
    const user_email=await db.verify_email(req.body.email);
  
    if(user_email){ return message.error(res,409,"email already exist ") }
    else
    {
      const {error}  = signupValidation(req.body)
      
      if(error){ return message.error(res,400,error.details[0].message)}  
     
    }
    next();
  }
 

  signin = async (req, res, next) =>
  {
  const {error}=loginValidation(req.body);
  if(error){return message.error(res,400,error.details[0].message)}
  const user_info =await db.information(req.body.email)
  if(user_info == undefined){return message.error(res,401,"you don\'t have account, signup please...")}
  else{
  const mypassword = await  bcrypt.compare(req.body.password,user_info.password)
  if(!mypassword){return message.error(res,401,"wrong password,reset your password ,....")}
  next();
  }



}


}
export default new Auth_middleware();
