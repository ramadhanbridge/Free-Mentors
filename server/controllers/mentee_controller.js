import db from '../models/mentee_model' 
class Mentee_controller
{


all_mentors = (req,res)=>
{
const All_mentors=db.all_mentors();
res.status(200).json({status:200,data:All_mentors})
}

specific_mentor=(req,res)=>
{
const single_mentor=db.specific_mentor(req.params.mentorid);
if(!single_mentor){return res.status(404).json({status:404,data:single_mentor})}
return res.status(200).json({status:200,data:single_mentor})
}



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

review=(req,res)=>
{

if(req.body.score === undefined || req.body.remark === undefined) 
{return res.status(400).json({status:400,message:"you have to enter score and remarks"})}

const single_mentor= db.session(req.params.sessionId)
if(!single_mentor){return res.status(404).json({status:404,message:"session does not exist"})}
else{
const menteeFullname=res.mentee_info.user_info.firstName +" "+res.mentee_info.user_info.lastname
const data=
{
   sessionId:single_mentor.sessionId,
   mentorId:single_mentor.mentorId,
   menteeId:single_mentor.menteeId,
   menteeFullname:menteeFullname, 
   score:req.body.score,
   remark:req.body.remark
}
const review_detail=db.review(data)
return res.status(201).json({status:201,message:"review successful sent",review_detail})
}
}

}
 export default new Mentee_controller();