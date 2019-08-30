import user_table from './memory';
const db=user_table.session;
class Mentor_modal
{

   // accept  request 

   accept_session =(data)=>
   {
   const user_info=db.find(session=>session.sessionId==data && session.status=="request")
   return user_info;
   }



}
export default new Mentor_modal();