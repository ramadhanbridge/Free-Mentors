import { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import mentee from '../controllers/mentee_controller';
import { TOKEN, MENTEE, PASS } from '../middleware/verify';

const router = Router();


// parse application/x-www-form-urlencoded
router.use(urlencoded({ extended: true }));

// parse application/json
router.use(json());

// all method that will be accessible by only mentee

router.get('/mentors', TOKEN, MENTEE, mentee.all_mentors);
router.get('/mentors/:mentorid', TOKEN, MENTEE, mentee.specific_mentor);
// export router
export default router;
