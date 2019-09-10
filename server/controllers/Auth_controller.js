import  jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
import  bcrypt from 'bcryptjs';
import  db from '../models/user_modal';
import  message from '../helpers/message'
import {loginValidation,signupValidation} from "../helpers/joi";
dotenv.config();
class Auth
{


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


signup =async (req,res)=>
{
  
  
  const user_email=db.verify_email(req.body.email);
  
  if(user_email){ return res.status(409).json(message.error(409,"email already exist "))}
  else
  {
    const {error}  =signupValidation(req.body)
    
    if(error){ return res.status(400).json(message.error(400,error.details[0].message))}  
    else
    {
      const salt         =await bcrypt.genSalt(10);
      const hashpassword =await bcrypt.hash(req.body.password,salt)
      const data=
      {
      id:db.userId(),
      firstName   :req.body.firstname,
      lastname    :req.body.lastname,
      address     :req.body.address,
      Bio         :req.body.bio ,
      occupation  :req.body.occupation,
      expertise   :req.body.expertise,
      email       :req.body.email,
      password    :hashpassword,
      role : "mentee"
      }

     const user_info = db.signup(data);
    
      jwt.sign({user_info}, process.env.PASS_KEY ,{ expiresIn:'1h'},(err,token)=>
      {

      return  res.status(201).json(message.success(201,"Account successfully created ",{user_info,token}))
      }); 
    }
  }
}



}
export default new Auth;
