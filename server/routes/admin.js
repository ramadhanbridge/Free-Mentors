import { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import admin from '../controllers/admin_controller';
import { TOKEN, ADMIN } from '../middleware/verify';

const router = Router();

router.use(urlencoded({ extended: true }));

router.use(json());


router.patch('/user/:userid', TOKEN, ADMIN, admin.change_mentee);
router.delete('/sessions/:sessionId/review', TOKEN, ADMIN, admin.delete_review);

export default router;
