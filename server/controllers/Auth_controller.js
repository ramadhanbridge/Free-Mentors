import  jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
import  bcrypt from 'bcryptjs';
import  db from '../models/user_modal';
import validate from '../helpers/Auth_validation';
import jwtValidation from '../helpers/jwt'
import  message from '../helpers/message'
import {loginValidation,signupValidation} from "../helpers/joi";
dotenv.config();
class Auth
{


  signup = async (req,res) =>
  {
     
    const user_email=await db.verify_email(req.body.email);
  
    if(user_email){ return message.error(res,409,"email already exist ") }
    else
    {
      const {error}  = signupValidation(req.body)
      
      if(error){ return message.error(res,400,error.details[0].message)}  
      else
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
  
       const user_info =await  db.signup(data);
       const token  =jwtValidation.jwt_signin(user_info)
       
       return  message.success(res,201,"Account successfully created ",{user_info,token})
         
      }
    }
  }
  


signin=async (req,res)=>
{
  
  const {error}=loginValidation(req.body);
  if(error){return res.status(400).json(message.error(400,error.details[0].message))}

  
  const user_info=db.information(req.body.email)

  
  
  if(user_info == undefined){return res.status(401).json(message.error(401,"you don\'t have account, signup please..."))}
  else{
  
  
  const mypassword=await  bcrypt.compare(req.body.password,user_info.password)

 
  if(!mypassword){return res.status(401).json(message.error(401,"wrong password,reset your password ,...."))}


  if(user_info.role == "mentee")
  {
   jwt.sign({user_info}, process.env.PASS_KEY ,{ expiresIn:'1h'},(err,token)=>
    {
     return res.status(200).json(message.success(200,"Mentee is successfully logged in",{user_info,token}))
    });  
  }
 else
 {

    if(user_info.role =="mentor")
    {  
       jwt.sign({user_info}, process.env.PASS_KEY ,{ expiresIn:'1h'},(err,token)=>
       {
         return  res.json(message.success(200,"Mentor is successfully logged in",{user_info,token}))
       }); 
    }

    else(user_info == 'admin')
    { 
       jwt.sign({user_info}, process.env.PASS_KEY ,{ expiresIn:'1h'},(err,token)=>
       {
        return   res.json(message.success(200,"Admin is successful signin in ",{user_info,token}))
       }); 
    }

  }
 } 
} 


}
export default new Auth();
