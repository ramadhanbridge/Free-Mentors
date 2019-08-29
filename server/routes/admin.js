import { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import admin from '../controllers/admin_controller';
import { TOKEN, ADMIN } from '../middleware/verify';

const router = Router();

// parse application/x-www-form-urlencoded
router.use(urlencoded({ extended: true }));

// parse application/json
router.use(json());

// all method that will be used by admin

router.patch('/user/:userid', TOKEN, ADMIN, admin.change_mentee);

// export router
export default router;
