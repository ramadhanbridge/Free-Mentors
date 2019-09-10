import { Router } from 'express';
import bodyParser from 'body-parser';
import Auth from '../controllers/Auth_controller';

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/auth/signin', Auth.signin);
router.post('/auth/signup', Auth.signup);

export default router;
