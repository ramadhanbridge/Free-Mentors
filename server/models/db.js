import  conn  from '../config/db'
import { config } from 'dotenv';
config();

class Db_queries{

  constructor() {
    this.connection = conn.dbConnection();
   }

     
  create_tables= async () =>
 {   
   try {
    // DROP TABLE IF EXISTS users CASCADE;
     let conn = this.connection;
     await conn.connect()
     await conn.query(`
     DROP TABLE IF EXISTS users CASCADE;
     
     CREATE TABLE IF NOT EXISTS users ( id SERIAL, firstName VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, expertise TEXT ,email VARCHAR(50) NOT NULL, occupation TEXT, password TEXT NOT NULL, address VARCHAR(50) NOT NULL, role TEXT NOT NULL,Bio TEXT , PRIMARY KEY (id));

     CREATE TABLE IF NOT EXISTS sessions ( sessionId SERIAL, mentorId INTEGER  references users(id) ON DELETE CASCADE, menteeId INTEGER references users(id) ON DELETE CASCADE,  mentor_name  VARCHAR(50) NOT NULL, questions  TEXT , menteeName VARCHAR(255) NOT NULL, menteeEmail VARCHAR(50)  , status VARCHAR(50) NOT NULL  ,PRIMARY KEY (sessionId));
   
     CREATE TABLE IF NOT EXISTS reviews (  sessionId SERIAL, mentorId INTEGER  references users(id) ON DELETE CASCADE , menteeId INTEGER references users(id) ON DELETE CASCADE, remark  TEXT NOT NULL, menteeFullname  TEXT  , score INTEGER,PRIMARY KEY (sessionId));
    
        `);
    await conn.query(`INSERT INTO users(firstName,lastname,expertise,email,occupation,role,password,address,Bio) VALUES(
          'admin',
          'lastname',
          'programmer',
          '$admin@gmail.com',
          'swimming',
          'admin',
          '${process.env.FAKE_PASS_WORD}',
          'kigali',
          'i like animals'
        ) 
      `);
      await conn.query(`INSERT INTO users(firstName,lastname,expertise,email,occupation,role,password,address,Bio) VALUES(
        'ramadhan',
        'lastname',
        'programmer',
        'ramadhan@gmail.com',
        'swimming',
        'mentee',
        '${process.env.FAKE_PASS_WORD}',
        'kigali',
        'i like animals'

        ) 
       `);
    await conn.query(`INSERT INTO users(firstName,lastname,expertise,email,occupation,role,password,address,Bio) VALUES(
      'ezila',
      'lastname',
      'programmer',
      '$ezila@gmail.com',
      'swimming',
      'mentor',
      '${process.env.FAKE_PASS_WORD}',
      'kigali',
      'i like animals'

       ) 
      `);
    await conn.query(`INSERT INTO sessions(mentorId , menteeId ,  mentor_name , questions , menteeName , menteeEmail, status ) VALUES(
        1,
        1,
        'ezila',
        'why so serious',
        'ramadhan',
        'ramadhan@gmail.com',
        'request'
       ) 
    `);

    await conn.end();

   } catch(err) {

     console.log(`MY ERROR IN MEMORY ${err} ;that is error`)

   }
  }

}
export default new Db_queries();
