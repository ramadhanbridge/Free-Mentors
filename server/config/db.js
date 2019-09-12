import { Pool } from 'pg';
import { config } from 'dotenv';
config();
class Database{
  
  dbConnection = () => {
    return new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }
  
}

export default new Database();


