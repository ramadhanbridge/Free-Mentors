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

  

    create_session = async (data) =>
    {
        let conn = this.connection;
     await conn.connect()
     const result = await conn.query(`INSERT INTO sessions(mentorId , menteeId ,  mentor_name , questions , menteeName , menteeEmail, status ) VALUES(
      '${data.mentorId}',
      '${data.menteeId}',
      '${data.mentor_name}',
      '${data.questions}',
      '${data.menteeName}',
      '${data.menteeEmail}',
      '${data.status}'
      ) returning *;
    `);
    return result.rows[0];
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
 

}
export default new Mentee_modal();