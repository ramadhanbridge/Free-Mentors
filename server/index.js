import express from 'express';
import PORT from './config/port';
import authroute from './routes/Auth';
import adminroute from './routes/admin';
import not_found from './routes/default';

const app = express();

// routers that will be used

app.use('/api/v1', authroute);
app.use('/api/v1', adminroute);

app.use(not_found);

// start server
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
export default app;
