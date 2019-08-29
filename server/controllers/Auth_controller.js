import  jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
import  bcrypt from 'bcryptjs';
import  db from '../models/user_modal'
import {loginValidation,signupValidation} from "../helpers/joi";
dotenv.config();
class Auth
{

// ******signin method start*******// 

signin=async (req,res)=>
{
  // validate the input info using joi
  const {error}=loginValidation(req.body);
  if(error){return res.status(400).json({status:400,message:error.details[0].message})}

  // get user information from user_modal
  const user_info=db.information(req.body.email)

  //  check user if is in our database
  //  if user available we must know his status or role in-order to give him correct info
  if(user_info == undefined){return res.status(401).json({status:401,message:"you don't have account, signup please..."})}
  else{
  
  // bycrypt method to check if provided password match with hashed password
  const mypassword=await  bcrypt.compare(req.body.password,user_info.password)

  // 401 unauthorized
  if(!mypassword){return res.status(401).json({status:401,message:"wrong password,reset your password ,...."})}


  if(user_info.role == "mentee")
  {
   jwt.sign({user_info}, process.env.PASS_KEY ,{ expiresIn:'1h'},(err,token)=>
    {
     return res.status(200).json({status:200,message:"Mentee is successfully logged in",data:{user_info,token}})
    });  
  }
 else
 {

    if(user_info.role =="mentor")
    {  
       jwt.sign({user_info}, process.env.PASS_KEY ,{ expiresIn:'1h'},(err,token)=>
       {
         return  res.json({status:200,message:"Mentor is successfully logged in",data:{user_info,token}})
       }); 
    }

    else(user_info == 'admin')
    { 
       jwt.sign({user_info}, process.env.PASS_KEY ,{ expiresIn:'1h'},(err,token)=>
       {
        return   res.json({status:200,message:"Admin is successful signin in ",data:{user_info,token}})
       }); 
    }

  }
 }
} 
// ******signin method ends*******// 


 // ******signup method start*******// 

signup =async (req,res)=>
{
  
  //  verify user email before signup  because email must be one, for single user
  const user_email=db.verify_email(req.body.email);
   
  // 409 to show that contents already exist on our server
  if(user_email){ return res.status(409).json({status:409,message:"email already exist "})}
  else
  {
    const {error}  =signupValidation(req.body)
    // 400 (bad request) to show that server did not understand the request due to bad syntax or missing info
    if(error){ return res.status(400).json({status:400,message:error.details[0].message})}  
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

      // insert data in our non persistent memory after verification
     const user_info = db.signup(data);
    
      jwt.sign({user_info}, process.env.PASS_KEY ,{ expiresIn:'1h'},(err,token)=>
      {
      // 201 status code to show that request is successful and contents has been created
      return  res.status(201).json({status:"201",message:"Account successfully created ",data:{user_info,token}})
      }); 
    }
  }
}

// ******signup method ends*******// 

}
export default new Auth;
