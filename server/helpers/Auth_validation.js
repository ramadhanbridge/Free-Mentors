import  jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
import  bcrypt from 'bcryptjs';

dotenv.config();
class Auth_validation
{


password_encryption =async (data)=>
{
  const salt         =await bcrypt.genSalt(10);
  const hashpassword =await bcrypt.hash(data,salt)
  return hashpassword;
}



}
export default new Auth_validation;
