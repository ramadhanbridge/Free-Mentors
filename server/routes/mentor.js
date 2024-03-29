import { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import Mentor from '../middleware/mentor_middleware'
import mentor from '../controllers/mentor_controller';
import { TOKEN, MENTOR } from '../middleware/verify';

const router = Router();

router.use(urlencoded({ extended: true }));


router.use(json());


router.patch('/:sessionId/accept', TOKEN, MENTOR, Mentor.accept, mentor.accept_session);
router.patch('/:sessionId/reject', TOKEN, MENTOR, Mentor.reject,mentor.reject_session);


export default router;
