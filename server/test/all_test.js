// import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import default_route from '../routes/default'
import { config } from 'dotenv';
import { TOKEN } from '../middleware/verify';
import app from '../index';
import web from '../models/memory';
import { signupValidation,loginValidation } from '../helpers/joi';

const { expect } = chai;
const user = web.web_user;
const user_info = user[4];
const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY);

config();
chai.use(chaiHttp);


// Test signup for the user

describe('(1) signup with existing email', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(user[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.message).to.equal('email already exist ');
        done();
      });
  });
});

describe(' (2) signup with uncompleted information', () => {
  it('should return an error', (done) => {
    const { error } = signupValidation({ id: 7, email: 'f' });
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({ id: 7, email: 'f' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal(`${error.details[0].message}`);
        done();
      });
  });
});

describe('(3) signup with completed  information', () => {
  it('should return an info', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'amani',
        lastname: 'second',
        address: 'musanze',
        Bio: 'smart,with EPIC value',
        occupation: 'software eng',
        expertise: 'js c++ php',
        email: 'amanidiope@gmail.com',
        password: 'ramadhan',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.message).to.equal('Account successfully created ');
        done();
      });
  });
});

// test signin for the user

describe(' (4) signin with uncompleted information, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    const { error } = loginValidation({ email: 'd', password: 'ramadhan' });
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send({ email: 'd', password: 'ramadhan' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal(`${error.details[0].message}`);
        done();
      });
  });
});

describe('(5) signin with invalid information, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin1@gmail.com', password: 'ramadhan1' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('you don\'t have account, signup please...');
        done();
      });
  });
});

describe(' (5) signin with invalid information, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin@gmail.com', password: 'ramadhan1' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('wrong password,reset your password ,....');
        done();
      });
  });
});


describe(' (6) signin with valid information as mentee, api/v1/auth/signin', () => {
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send({ email: 'john@gmail.com', password: 'ramadhan' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Mentee is successfully logged in');
        done();
      });
  });
});

describe(' (7) signin with valid information as mentor, api/v1/auth/signin', () => {
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send({ email: 'ezila@gmail.com', password: 'ramadhan' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Mentor is successfully logged in');
        done();
      });
  });
});


describe(' (8) signin with valid information as admin, api/v1/auth/signin', () => {
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin@gmail.com', password: 'ramadhan' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Admin is successful signin in ');
        done();
      });
  });
});

// verify  test

describe(' (9) verify if we have  token', () => {
  const Req = { headers: { authorization: admin_token } };

  const Res = {
    status: (code) => `status${code}`,
  };
  let nextbe = false;
  const next = function () { return nextbe = true; };
  it('test', () => {
    Req.headers.authorization = admin_token;
    TOKEN(Req, Res, next);
    expect(nextbe).to.be.true;
  });
});


// admin test verification

describe(' (10) signin with invalid information as admin, api/v1/auth/signin', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/user/4')
      .set('authorization', mentee_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('forbidden, not admin..');
        done();
      });
  });
});


describe(' (11) signin with valid information as admin but user does not exist, api/v1/auth/signin', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/user/1000000')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('user does not exist');
        done();
      });
  });
});


describe(' (12) signin with valid information as admin and user exist, api/v1/auth/signin', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/user/1')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});


describe(' (13) signin with valid information as admin and delete review that not available', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/-1/review')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('session does not exist');
        done();
      });
  });
});


describe(' (14) signin with valid information as admin and delete review that exist', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1/review')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});

// test mentee operation

describe(' (15) signin with invalid information ', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('forbidden, not mentee..');
        done();
      });
  });
});


describe(' (16) signin with valid information  to get all  mentors', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .set('authorization', mentee_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


describe(' (17) signin with valid information  to get specific mentors who does not exist  ', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/-1')
      .set('authorization', mentee_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});


describe(' (18) signin with valid information  to get specific mentor who exist  ', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/3')
      .set('authorization', mentee_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


describe(' (19) signin with valid information  to make session request with invalid input', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('authorization', mentee_token)
      .send({ mentorId: '3', mentor_name: 'ezila' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('enter valid(mentorId,question,mentor_name)');
        done();
      });
  });
});


describe(' (20) signin with valid information  to make session request with valid input', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('authorization', mentee_token)
      .send({ mentorId: '3', mentor_name: 'ezila', question: 'tell me why dev' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('request sent');
        done();
      });
  });
});


describe(' (21) signin with valid information and make review to the mentor response,but with invalid input', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .set('authorization', mentee_token)
      .send({ score: 3 })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('you have to enter score and remarks');
        done();
      });
  });
});


describe(' (22) signin with valid information and make review to the mentor response,but session does not available', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/-1/review')
      .set('authorization', mentee_token)
      .send({ score: 3, remark: 'thx mentor' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('session does not exist');
        done();
      });
  });
});


describe(' (23) signin with valid information and make review to the mentor response', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .set('authorization', mentee_token)
      .send({ score: 3, remark: 'thx mentor' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('review successful sent');
        done();
      });
  });
});
// test for mentor

describe(' (24) signin with invalid information as mentor', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/1/accept')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('forbidden, not mentor..');
        done();
      });
  });
});

describe(' (25) signin with valid information as mentor and session not available', () => {
  const user_info = user[3];
  const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/-1/accept')
      .set('authorization', mentor_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('session does not exist');
        done();
      });
  });
});

describe(' (26) signin with valid information as mentor and session available,', () => {
  const user_info = user[3];
  const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/1/accept')
      .set('authorization', mentor_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


describe(' (27) signin with invalid information as mentor to reject session', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/1/reject')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('forbidden, not mentor..');
        done();
      });
  });
});

describe(' (28) signin with valid information as mentor and session not available(reject)', () => {
  const user_info = user[3];
  const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/-1/reject')
      .set('authorization', mentor_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('session does not exist');
        done();
      });
  });
});

describe(' (29) signin with valid information as mentor and session available,(reject)', () => {
  const user_info = user[3];
  const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v1/2/reject')
      .set('authorization', mentor_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


// session that correspond to mentor or mentee


describe(' (30) signin with valid information  to get sessions as mentor or mentee ', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('forbidden, create account please..');
        done();
      });
  });
});

describe(' (31) signin with valid information  to get sessions as mentor (200) ', () => {
  const user_info = user[3];
  const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('authorization', mentor_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


describe(' (32) signin with valid information  to get sessions as mentee (200) ', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('authorization', mentee_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});

