import  jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
import  db from '../models/user_modal';
import validate from '../helpers/Auth_validation';
import jwtValidation from '../helpers/jwt'
import  message from '../helpers/message'
dotenv.config();
class Auth
{


  signup = async (req,res) =>
  {
     
    
        const data=
        {
        firstName   :req.body.firstName,
        lastname    :req.body.lastname,
        address     :req.body.address,
        Bio         :req.body.Bio ,
        occupation  :req.body.occupation,
        expertise   :req.body.expertise,
        email       :req.body.email,
        password    : await validate.password_encryption(req.body.password),
        role : 'mentee'
        }
      console.log(data.password)
       const user_info =await  db.signup(data);
       const token  =jwtValidation.jwt_signin(user_info)
       
       return  message.success(res,201,"Account successfully created ",token)
         
     
    
  }
  


signin=async (req,res)=>
{
  const token  =jwtValidation.jwt_signin(req.body)
  return  message.success(res,201,"successfully logged in",token)
} 


}
export default new Auth();
