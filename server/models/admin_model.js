import user_table from './db';
const review_table=user_table.review;
const webuser_table=user_table.web_user;
class Admin_modal
{

 
  
   admin_change_mentee  =(data)=>
   {
    const change_user=webuser_table.find(single=>single.id==data && single.role=="mentee")
    return change_user;
   }

  
    admin_delete_session =(data)=>
   {
   const delete_review=review_table.find(single=> single.sessionId==data)
    if(delete_review){
        const postion = review_table.findIndex(x => x.sessionId == delete_review.sessionId)
        review_table.splice(postion,1);
        return true
    }
   
   return false;
   }

  


}
export default new Admin_modal() ;