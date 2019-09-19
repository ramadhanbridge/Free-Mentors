import user_table from './db';
const db=user_table.session;
class Session_modal 
{

  
  
   all_sessions  =(data)=>
   {
   const all_sessions= db.filter(specific=> specific.mentorId==data)
   return all_sessions;
   }
  
    all_session_request=(data)=>
   {
    const all_request=db.filter(all=> all.menteeId==data)
    return all_request;
   }


  


}
export default new Session_modal();