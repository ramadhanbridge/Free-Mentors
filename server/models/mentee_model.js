import user_table from './memory';
const db_session=user_table.session;
const db_review=user_table.review;
const db_users=user_table.web_user;
class Mentee_modal
{

  
  
   all_mentors =()=>
   {
    const all_sessions= db_users.filter(all=>all.role=="mentor")
    return all_sessions;
   }

  
  specific_mentor =(data)=>
  {
  const specific_mentor= db_users.find(all=>all.id==data && all.role=="mentor")
  return specific_mentor;
  }

  

    create_session =(data)=>
    {
    db_session.push(data)
    return data;
    }

    
    
     review=(data)=>
     {
         db_review.push(data)
         return data;
     }
 
     session=(data)=>
     {
         const find_session=db_session.find(single=> single.sessionId==data)
         return find_session; 
     }
 
  
   sessionId=()=>
   {
       const length=db_session.length
       return length; 
   }

}
export default new Mentee_modal();