import { Router } from 'express';
import bodyParser from 'body-parser';
import Auth_validate from '../middleware/Auth_middleware'
import Auth from '../controllers/Auth_controller';

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/auth/signin',Auth_validate.signin , Auth.signin);
router.post('/auth/signup',Auth_validate.signup , Auth.signup);

export default router;
