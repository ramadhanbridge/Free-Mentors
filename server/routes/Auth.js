import { Router } from 'express';
import bodyParser from 'body-parser';
import signup from '../middleware/Auth_middleware'
import Auth from '../controllers/Auth_controller';

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/auth/signin', Auth.signin);
router.post('/auth/signup',signup.signup_middleware,Auth.signup);

export default router;
