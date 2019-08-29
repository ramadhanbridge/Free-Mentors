import { Router } from 'express';
import bodyParser from 'body-parser';
import Auth from '../controllers/Auth_controller';

const router = Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
router.use(bodyParser.json());

// available routes for Auth

router.post('/auth/signup', Auth.signup);

// export router
export default router;
