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
    let accepted = await  db.reject_session(req.params.sessionId)
    return message.success(res,200,"request accepted",accepted)
}



}

 export default new Mentor_controller();