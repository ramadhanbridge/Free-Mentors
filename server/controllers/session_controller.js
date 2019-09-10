import  db from '../models/session_model'
class Session_controller
{

getall = (req,res)=>
{
if(res.pass_info.user_info.role == "mentor")
{

    

const all=db.all_sessions(res.pass_info.user_info.id);
if(!all){return res.status(204).json({status:204,message:"no request so far..."})}
return res.status(200).json({status:200,message:"view all request",data:all})
}

if(res.pass_info.user_info.role == "mentee")
{
  
    
const single_mentor=db.all_session_request(res.pass_info.user_info.id)
if(!single_mentor){return res.status(404).json({status:404,message:"user does not exist"})}
return res.status(200).json({status:200,data:single_mentor});
}

}

}

 export default new Session_controller();