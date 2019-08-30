import { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import mentor from '../controllers/mentor_controller';
import { TOKEN, MENTOR } from '../middleware/verify';

const router = Router();
// parse application/x-www-form-urlencoded
router.use(urlencoded({ extended: true }));

// parse application/json
router.use(json());


// all method that will be used by mentor

router.patch('/:sessionId/accept', TOKEN, MENTOR, mentor.accept_session);



// export router
export default router;
