import  db from '../models/mentor_modal'
class Mentor_controller
{
  

 //**** mentor accept session start ****/ 
accept_session=(req,res)=>
{
const session_tobe_accepted=db.accept_session(req.params.sessionId);
if(!session_tobe_accepted){return res.status(404).json({status:404,message:"session does not exist"})}
else
{
    session_tobe_accepted.status="accepted"
   return res.status(200).json({status:200,data:{message:"request accepted",user:session_tobe_accepted}})
}
}
//**** ends ****/ 



//**** mentor reject session start ****/ 
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
//**** ends ****/ 


}

 export default new Mentor_controller();