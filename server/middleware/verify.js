import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const TOKEN = (req, res, next) => {
  const Header = req.headers.authorization;
  if (typeof Header !== 'undefined') {
    req.token = Header;
    return next();
  }
  return res.status(403).json({ status: 403, message: 'I invalid credentials' });
};


const ADMIN = (req, res, next) => {
  verify(req.token, process.env.PASS_KEY, (err, admin_info) => {
    if (err) { res.json({ err, message: 'invalid credentials,log in again...' }); } else {
      if (admin_info.user_info.role == 'admin') {
        res.admin_info = admin_info;
        return next();
      }

      return res.status(403).json({ status: 403, message: 'forbidden, not admin..' });
    }
  });
};

const MENTEE = (req, res, next) => {
  verify(req.token, process.env.PASS_KEY, (err, mentee_info) => {
    console.log(mentee_info.user_info.role);
    if (err) {
      res.json({ err, message: 'invalid credentials,log in again...' });
    } else {
      if (mentee_info.user_info.role == 'mentee') {
        res.mentee_info = mentee_info;

        return next();
      }

      return res.status(403).json({ status: 403, message: 'forbidden, not mentee..' });
    }
  });
};


const MENTOR = (req, res, next) => {
  verify(req.token, process.env.PASS_KEY, (err, mentor_info) => {
    if (err) { res.json({ err, message: 'invalid credentials,log in again...' }); } else {
      if (mentor_info.user_info.role == 'mentor') {
        res.mentor_info = mentor_info;
        return next();
      }

      return res.status(403).json({ status: 403, message: 'forbidden, not mentor..' });
    }
  });
};


const PASS = (req, res, next) => {
  verify(req.token, process.env.PASS_KEY, (err, pass_info) => {
    if (err) { res.json({ err, message: 'invalid credentials,log in again...' }); } else {
      if (pass_info.user_info.role == 'mentor') {
        res.pass_info = pass_info;
        return next();
      }
      if (pass_info.user_info.role == 'mentee') {
        res.pass_info = pass_info;
        return next();
      }

      return res.status(403).json({ status: 403, message: 'forbidden, create account please..' });
    }
  });
};


export { TOKEN };
export { PASS };
export { ADMIN };
export { MENTEE };
export { MENTOR };
