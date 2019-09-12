import  conn  from '../config/db'

class Admin_modal
{
    constructor() {
        this.connection = conn.dbConnection();
       }
 
    admin_change_mentee  = async (id) =>
   {
    try{
        let conn = this.connection;
        await conn.connect()
        console.log('connectionm')
        const result = await conn.query(`UPDATE users SET role = 'mentor' WHERE id = '${id}' AND role = 'mentee' returning *;`);
        return result.rows[0];
       } catch (error)
       {
         console.log(error)
       }
    
   }

  
   
}
export default new Admin_modal() ;