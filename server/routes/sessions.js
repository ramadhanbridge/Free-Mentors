import { Router } from 'express';
import sessions from '../controllers/session_controller';
import { TOKEN, PASS } from '../middleware/verify';

const router = Router();


router.get('/sessions', TOKEN, PASS, sessions.getall);


export default router;
