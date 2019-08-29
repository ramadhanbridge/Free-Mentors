import user_table from './memory';
const webuser_table=user_table.web_user;
class Admin_modal
{

   // admin change mentee to a mentor
  
   admin_change_mentee  =(data)=>
   {
    const change_user=webuser_table.find(single=>single.id==data && single.role=="mentee")
    return change_user;
   }

  

  


}
export default new Admin_modal() ;