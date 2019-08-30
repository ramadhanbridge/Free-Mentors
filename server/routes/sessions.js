import { Router } from 'express';
import sessions from '../controllers/session_controller';
import { TOKEN, PASS } from '../middleware/verify';

const router = Router();


// optional:either user or mentor can view sessions that correspondes to him

router.get('/sessions', TOKEN, PASS, sessions.getall);


// export router
export default router;
