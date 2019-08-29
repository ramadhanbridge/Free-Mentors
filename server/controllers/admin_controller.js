import db from '../models/admin_model'
class Admin_controller
{ 

change_mentee=(req,res)=>  
{
const single=db.admin_change_mentee(req.params.userid);
// 404 not found
if(!single){ return res.status(404).json({status:404,message:"user does not exist"})}
else{
// change user to a mentor
    single.role="mentor"
   return   res.json({status:200,data:{message:"account changed to a mentor",user:single}})
}
}

}

export default new Admin_controller();