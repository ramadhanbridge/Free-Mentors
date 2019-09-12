import  conn  from '../config/db'

class Mentee_modal
{
    constructor() {
        this.connection = conn.dbConnection();
       }
 
  
  
   all_mentors = async () =>
   {
    try{
        let conn = this.connection;
        await conn.connect()
        const result = await conn.query(`SELECT * FROM users WHERE role = 'mentor' `);
        return result.rows;
       } catch (error)
       {
         console.log(error)
       }
   
   }

  
  specific_mentor = async (id) =>
  {
    try{
        let conn = this.connection;
        await conn.connect()
        const result = await conn.query(`SELECT * FROM users WHERE id = '${id}' `);
        return result.rows[0];
       } catch (error)
       {
         console.log(error)
       }
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