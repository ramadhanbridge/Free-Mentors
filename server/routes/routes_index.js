import { Router } from 'express';
import authroute from './Auth';
import adminroute from './admin';
import menteeroute from './mentee';
import mentorroute from './mentor';


const router = Router(); 

router.use( authroute );
router.use( adminroute);
router.use( mentorroute);
router.use( menteeroute);


export default router;
