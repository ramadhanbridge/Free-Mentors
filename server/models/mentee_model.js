import user_table from './memory';
const db_session=user_table.session;
const db_review=user_table.review;
const db_users=user_table.web_user;
class Mentee_modal
{

   // select all mentors
  
   all_mentors =()=>
   {
    const all_sessions= db_users.filter(all=>all.role=="mentor")
    return all_sessions;
   }

 

}
export default new Mentee_modal();