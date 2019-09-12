import { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import Admin1 from '../middleware/admin_middleware'
import admin from '../controllers/admin_controller';
import { TOKEN, ADMIN } from '../middleware/verify';

const router = Router();

router.use(urlencoded({ extended: true }));

router.use(json());


router.patch('/user/:userid', TOKEN, ADMIN, Admin1.change ,admin.change_mentee);


export default router;
