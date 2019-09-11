import  conn  from '../config/db'

class User_modal
{
  constructor() {
      this.connection = conn.dbConnection();
     }


   verify_email = async ( email ) =>
  {   
    try{
     let conn = this.connection;
     await conn.connect()
     const result = await conn.query(`SELECT * FROM users WHERE email = '${email}'`);
     return result.rows[0];
    } catch (error)
    {
      console.log(error)
    }

  }

  information = async ( email ) =>
  {   
    try{
     let conn = this.connection;
     await conn.connect()
     const result = await conn.query(`SELECT * FROM users WHERE email = '${email}'`);
     console.log(result.rows[0])
     return result.rows[0];
    } catch (error)
    {
      console.log(error)
    }

  }

 

   signup = async ( data ) =>
  {   
  
     let conn = this.connection;
     await conn.connect()
     const result = await conn.query(`INSERT INTO users(firstName,lastname,expertise,email,occupation,role,password,address,Bio) VALUES(
      '${data.firstName}',
      '${data.lastname}',
      '${data.expertise}',
      '${data.email}',
      '${data.occupation}',
      '${data.role}',
      '${data.password}',
      '${data.address}',
      '${data.Bio}'
    ) returning *;
  `);

    return result.rows[0];
  }


}
export default new User_modal();