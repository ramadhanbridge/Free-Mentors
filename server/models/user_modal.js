import user_table from './db';
const db=user_table.web_user;
class User_modal
{

   
  
   verify_email=(data)=>
   {
   const email_exist= db.find(av=>av.email ==data)
   if(email_exist) return true;
   else return false;
   }

 

   information=(data)=>
   {
   const user_info= db.find(av=>av.email ==data)
   return user_info;
   }



  signup =(data)=>
  { 
   db.push(data);
   return data;
  };

 

   userId=()=>db.length+1;

}
export default new User_modal();