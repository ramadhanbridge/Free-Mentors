import user_table from './memory';
const db=user_table.web_user;
class User_modal
{
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