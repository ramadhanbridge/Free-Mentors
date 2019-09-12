import db from '../models/mentee_model' 
import message from '../helpers/message'
class Mentee_controller
{


all_mentors = async (req,res)=>
{
 const All_mentors=await db.all_mentors();
 return message.success(res,200,"View  available mentors",All_mentors)
}

specific_mentor= async (req,res)=>
{
const single_mentor= await db.specific_mentor(req.params.mentorid);
return message.success(res,200,"View specific mentors",single_mentor)
}



session_request = async (req,res)=> 
{
const session_info=
{ 
   mentorId:req.body.mentorId,
   mentor_name:req.body.mentor_name,
   menteeId:res.mentee_info.user_info.id,
   menteeName:res.mentee_info.user_info.firstname,
   menteeEmail:res.mentee_info.user_info.email,
   questions:req.body.question,
   status:"request" 
}

const session_created= await db.create_session(session_info)
return message.success(res,200,"request sent",session_created);
} 


}
 export default new Mentee_controller();