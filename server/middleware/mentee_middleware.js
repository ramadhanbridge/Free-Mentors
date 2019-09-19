import  db from '../models/mentee_model';
import  message from '../helpers/message'

class Mentee
{

 specific_validate= async (req, res, next)=>
{
const single_mentor= await db.specific_mentor(req.params.mentorid);
if(!single_mentor){return message.error(res,404,"mentor does not exist")}
next(res.user_info)
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
export default new Mentee();
