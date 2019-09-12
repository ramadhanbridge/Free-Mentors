import  db from '../models/mentor_modal';
import  message from '../helpers/message'

class Mentor
{
    accept = async (req,res, next) =>
    {
    const session_tobe_accepted=await db.accept_session(req.params.sessionId);
    if(!session_tobe_accepted){return message.error(res,400,"session does not exist")}
    next();
    }

request_Validate = async (req,res, next)=> 
{

if(req.body.mentorId === undefined ||req.body.mentor_name === undefined || req.body.question === undefined )
{
return message.error(res,400,"unvalid (mentorId,question,mentor_name)")
}
next();

} 



}
export default new Mentor();
