import  jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
import  bcrypt from 'bcryptjs';
import  db from '../models/user_modal'
import {signupValidation} from "../helpers/joi";
dotenv.config();
class Auth
{
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
