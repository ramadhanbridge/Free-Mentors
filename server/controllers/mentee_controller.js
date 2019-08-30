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



}
 export default new Mentee_controller();