import db from '../models/mentor_modal' 
import message from '../helpers/message'
class Mentor_controller
{
  
accept_session= async (req,res) =>
{
  let accepted = await  db.accept_session(req.params.sessionId)
  return message.success(res,200,"request accepted",accepted)
}

reject_session=(req,res)=>
{
const session_tobe_rejected=db.reject_session(req.params.sessionId);
if(!session_tobe_rejected){return res.status(404).json({status:404,message:"session does not exist"})}
else
{
    session_tobe_rejected.status="rejected"
   return  res.status(200).json({status:200,data:{message:"request rejected",data:session_tobe_rejected}})
}
}



}

 export default new Mentor_controller();