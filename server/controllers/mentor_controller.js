import db from '../models/mentor_modal' 
import message from '../helpers/message'
class Mentor_controller
{
  
accept_session= async (req,res) =>
{
  let accepted = await  db.accept_session(req.params.sessionId)
  return message.success(res,200,"request accepted",accepted)
}

reject_session= async (req,res) =>
{
    let rejected = await  db.reject_session(req.params.sessionId)
    return message.success(res,200,"request rejected",rejected)
}



}

 export default new Mentor_controller();