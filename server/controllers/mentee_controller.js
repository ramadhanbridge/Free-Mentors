import db from '../models/mentee_model' 
class Mentee_controller
{
//   mentee can view all mentors

all_mentors = (req,res)=>
{
const All_mentors=db.all_mentors();
res.status(200).json({status:200,data:All_mentors})
}


//  this will get specific mentor
specific_mentor=(req,res)=>
{
const single_mentor=db.specific_mentor(req.params.mentorid);
if(!single_mentor){return res.status(404).json({status:404,data:single_mentor})}
return res.status(200).json({status:200,data:single_mentor})
}


//  mentee should be able to make session request
session_request = (req,res)=> 
{

if(req.body.mentorId === undefined ||req.body.mentor_name === undefined || req.body.question === undefined )
{return res.status(400).json({status:400,message:"enter valid(mentorId,question,mentor_name)"})}
const sessionId=db.sessionId();
const session_info=
{ 
   sessionId:sessionId,
   mentorId:req.body.mentorId,
   mentor_name:req.body.mentor_name,
   menteeId:res.mentee_info.user_info.id,
   menteeName:res.mentee_info.user_info.firstName,
   menteeEmail:res.mentee_info.user_info.email,
   questions:req.body.question,
   status:"request" 
}

const session_created= db.create_session(session_info)
return res.status(200).json({status:200,message:"request sent",data:session_created})
} 





}
 export default new Mentee_controller();