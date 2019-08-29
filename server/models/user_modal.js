import user_table from './memory';
const db=user_table.web_user;
class User_modal
{

   // select  email is not taken by onether user
  
   verify_email=(data)=>
   {
   const email_exist= db.find(av=>av.email ==data)
   if(email_exist) return true;
   else return false;
   }

   // select user information

   information=(data)=>
   {
   const user_info= db.find(av=>av.email ==data)
   return user_info;
   }

   // push data in our database after full verification in our controller

  signup =(data)=>
  { 
   db.push(data);
   return data;
  };

  // get data length of our user table

   userId=()=>db.length+1;

}
export default new User_modal();