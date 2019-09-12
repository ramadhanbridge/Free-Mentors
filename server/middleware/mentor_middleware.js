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


    reject = async (req,res, next) =>
    {
    const session_tobe_accepted=await db.accept_session(req.params.sessionId);
    if(!session_tobe_accepted){return message.error(res,400,"session does not exist")}
    next();
    }



}
export default new Mentor();
