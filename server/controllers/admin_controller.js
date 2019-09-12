
import message from '../helpers/message'
class Admin_controller
{ 
  
change_mentee=(req,res)=>  
{

   return   message.success(res,200,"account changed to a mentor")

}

}

export default new Admin_controller();