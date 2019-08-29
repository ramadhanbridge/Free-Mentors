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

delete_review=(req,res)=>
{
const single_mentor=db.admin_delete_session(req.params.sessionId);
if(!single_mentor){return res.status(404).json({status:404,message:"session does not exist"})}else{

return res.status(200).json({status:200,data:{message:"review  successful deleted"}})
}}

}

export default new Admin_controller();