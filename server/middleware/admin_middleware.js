import  db from '../models/admin_model';
import  message from '../helpers/message'

class Admin 
{


  change = async (req,res, next) =>
  {
    console.log("single")
    const single= await db.admin_change_mentee(req.params.userid);
    console.log(single)
    if(!single){ return message.error(res,404,"mentee does not exist")}
    next()
  }
 


}
export default new Admin();
