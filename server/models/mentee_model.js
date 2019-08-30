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

  // get specific mentor
  
  specific_mentor =(data)=>
  {
  const specific_mentor= db_users.find(all=>all.id==data && all.role=="mentor")
  return specific_mentor;
  }

    // create session 

    create_session =(data)=>
    {
    db_session.push(data)
    return data;
    }

     // mentee should be able to make review after mentorship session
    
     review=(data)=>
     {
         db_review.push(data)
         return data;
     }
 
     // specific session
     session=(data)=>
     {
         const find_session=db_session.find(single=> single.sessionId==data)
         return find_session; 
     }
 
  
   // session id
   sessionId=()=>
   {
       const length=db_session.length
       return length; 
   }

}
export default new Mentee_modal();