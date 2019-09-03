import express from 'express';
import PORT from './config/port';
import authroute from './routes/Auth';
import adminroute from './routes/admin';
import menteeroute from './routes/mentee';
import swaggerui from 'swagger-ui-express';
import api_documentation from './documentation/swagger.json'
import mentorroute from './routes/mentor';
import sessionroute from './routes/sessions';
import not_found from './routes/default';


const app = express();

// routers that will be used

app.use('/api/v1', authroute);
app.use('/api/v1', adminroute);
app.use('/api/v1', mentorroute);
app.use('/api/v1', menteeroute);
app.use('/api/v1', sessionroute);
app.use('/documentation',swaggerui.serve,swaggerui.setup(api_documentation));


app.use(not_found);

// start server
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
export default app;
