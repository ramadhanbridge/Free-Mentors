import  conn  from '../config/db'

class Db_queries{

  constructor() {
    this.connection = conn.dbConnection();
   }

     
  create_tables= async () =>
 {   
   try {

     let conn = this.connection;
     await conn.connect()
     await conn.query(`
     CREATE TABLE IF NOT EXISTS users ( id SERIAL, firstName VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, expertise TEXT ,email VARCHAR(50) UNIQUE NOT NULL, occupation TEXT, password TEXT NOT NULL, address VARCHAR(50) NOT NULL, role VARCHAR(20) NOT NULL,Bio TEXT , PRIMARY KEY (id));

     CREATE TABLE IF NOT EXISTS sessions ( sessionId SERIAL, mentorId INTEGER , menteeId INTEGER,  mentor_name  VARCHAR(50) NOT NULL, questions  TEXT , menteeName VARCHAR(255) UNIQUE NOT NULL, menteeEmail VARCHAR(50) UNIQUE NOT NULL , status VARCHAR(50) NOT NULL  ,PRIMARY KEY (sessionId));
   
     CREATE TABLE IF NOT EXISTS reviews (  sessionId SERIAL, mentorId INTEGER , menteeId INTEGER, remark  TEXT NOT NULL, menteeFullname  TEXT  , score INTEGER,PRIMARY KEY (sessionId));
    
        `);

    await conn.end();

   } catch(err) {

     console.log(`MY ERROR IN MEMORY ${err} ;that is error`)

   }
  }

}
export default new Db_queries();
