import db from '../models/mentee_model' 
class Mentee_controller
{
//   mentee can view all mentors

all_mentors = (req,res)=>
{
const All_mentors=db.all_mentors();
res.status(200).json({status:200,data:All_mentors})
}



}
 export default new Mentee_controller();