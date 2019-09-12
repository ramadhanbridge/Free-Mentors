import  conn  from '../config/db'

class Mentor_modal
{

    constructor() {
        this.connection = conn.dbConnection();
       }
 

   accept_session =async (id) =>
   {
    
     try{
         let conn = this.connection;
         await conn.connect()
         console.log('connectionm')
         const result = await conn.query(`UPDATE sessions SET status = 'accepted' WHERE sessionId = '${id}' AND status = 'request' returning *;`);
         console.log(result.rows[0])
         return result.rows[0];
        } catch (error)
        {
          console.log(error)
        }
    
    }



    reject_session =(data)=>
    {
    const user_info=db.find(session=>session.sessionId==data && session.status=="request")
    return user_info;
    }
 

}
export default new Mentor_modal();