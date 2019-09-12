import { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import Mentee from '../middleware/mentee_middleware'
import mentee from '../controllers/mentee_controller';
import { TOKEN, MENTEE, PASS } from '../middleware/verify';

const router = Router();


router.use(urlencoded({ extended: true }));

router.use(json());


router.get('/mentors', TOKEN,MENTEE, mentee.all_mentors);
router.get('/mentors/:mentorid', TOKEN, MENTEE,Mentee.specific_validate, mentee.specific_mentor);
router.post('/sessions', TOKEN, MENTEE, mentee.session_request);


router.post('/sessions/:sessionId/review', TOKEN, MENTEE, mentee.review);


export default router;
