import  dotenv from 'dotenv';
import  db from '../models/user_modal';
import  message from '../helpers/message'
import {signupValidation} from "../helpers/joi";
dotenv.config();
class Auth_middleware
{


  signup_middleware = async (req,res, next) =>
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
 

}
export default new Auth_middleware();
