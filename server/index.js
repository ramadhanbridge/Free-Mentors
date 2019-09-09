import express from 'express';
import PORT from './config/port';
import authroute from './routes/Auth'; 
import adminroute from './routes/admin';
import menteeroute from './routes/mentee';
import mentorroute from './routes/mentor';
import sessionroute from './routes/sessions';
import db_init from './models/db'
import not_found from './routes/default';

const swagger = require('swagger-ui-express');
const Api_documentation = require('./swagger.json');


const app = express();
db_init.create_tables();

app.use('/api/v1', authroute);
app.use('/api/v1', adminroute);
app.use('/api/v1', mentorroute);
app.use('/api/v1', menteeroute);
app.use('/api/v1', sessionroute);
app.use('/documentation', swagger.serve, swagger.setup(Api_documentation));


app.use(not_found);
app.listen(PORT, () => console.log(`server started on PORT ${PORT} `));
export default app;
