import db from '../models/admin_model'
import message from '../helpers/message'
class Admin_controller
{ 

change_mentee=(req,res)=>  
{
const single=db.admin_change_mentee(req.params.userid);

if(!single){ return res.status(404).json(message.error(404,"user does not exist"))}
else{

    single.role="mentor"
   return   res.status(200).json(message.success(200,"account changed to a mentor", single))
}
}

delete_review=(req,res)=>
{
const single_mentor=db.admin_delete_session(req.params.sessionId);
if(!single_mentor){return res.status(404).json(message.error(404,"session does not exist"))}else{

return res.status(200).json(message.success(200,"review  successful deleted"))

}
}
}

export default new Admin_controller();