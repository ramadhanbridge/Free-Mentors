import { Pool } from 'pg';
import { config } from 'dotenv';
config();
class Database{
  
  dbConnection = () => {
    return new Pool({
      connectionString: process.env.PG_CONNECTION
    });
  }
  
}

export default new Database();


