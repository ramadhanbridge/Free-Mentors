import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import { config } from 'dotenv';
import { TOKEN } from '../middleware/verify';
import app from '../index';
import fakeuser from '../models/moch';
import { signupValidation, loginValidation } from '../helpers/joi';

const { expect } = chai;
const user = fakeuser.web_users;
const user_info = user[4];
const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY);

config();
chai.use(chaiHttp);


describe(' (15) signin with invalid information ', () => {
  const user = fakeuser.web_users;
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v2/mentors')
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
  const user = fakeuser.web_users;
  const user_info = user[3];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    console.log("===",mentee_token)
    chai.request(app)
      .get('/api/v2/mentors')
      .set('authorization', mentee_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


describe(' (12) signin with valid information as admin and user exist, api/v1/auth/signin', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });

  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v2/user/2')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


describe(' (17) signin with valid information  to get specific mentors who does not exist  ', () => {
  const user = fakeuser.web_users;
  const user_info = user[3];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v2/mentors/-1')
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
  const user = fakeuser.web_users;
  const user_info = user[3]
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .get('/api/v2/mentors/3')
      .set('authorization', mentee_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


// describe(' (19) signin with valid information  to make session request with invalid input', () => {
//   const user_info = user[1];
//   const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .post('/api/v1/sessions')
//       .set('authorization', mentee_token)
//       .send({ mentorId: '3', mentor_name: 'ezila' })
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(400);
//         expect(res.body.status).to.equal(400);
//         expect(res.body.message).to.equal('enter valid(mentorId,question,mentor_name)');
//         done();
//       });
//   });
// });


// describe(' (20) signin with valid information  to make session request with valid input', () => {
//   const user_info = user[1];
//   const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .post('/api/v1/sessions')
//       .set('authorization', mentee_token)
//       .send({ mentorId: '3', mentor_name: 'ezila', question: 'tell me why dev' })
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(200);
//         expect(res.body.status).to.equal(200);
//         expect(res.body.message).to.equal('request sent');
//         done();
//       });
//   });
// });


// describe(' (21) signin with valid information and make review to the mentor response,but with invalid input', () => {
//   const user_info = user[1];
//   const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .post('/api/v1/sessions/1/review')
//       .set('authorization', mentee_token)
//       .send({ score: 3 })
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(400);
//         expect(res.body.status).to.equal(400);
//         expect(res.body.message).to.equal('you have to enter score and remarks');
//         done();
//       });
//   });
// });


// describe(' (22) signin with valid information and make review to the mentor response,but session does not available', () => {
//   const user_info = user[1];
//   const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .post('/api/v1/sessions/-1/review')
//       .set('authorization', mentee_token)
//       .send({ score: 3, remark: 'thx mentor' })
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(404);
//         expect(res.body.status).to.equal(404);
//         expect(res.body.message).to.equal('session does not exist');
//         done();
//       });
//   });
// });


// describe(' (23) signin with valid information and make review to the mentor response', () => {
//   const user_info = user[1];
//   const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .post('/api/v1/sessions/1/review')
//       .set('authorization', mentee_token)
//       .send({ score: 3, remark: 'thx mentor' })
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(201);
//         expect(res.body.status).to.equal(201);
//         expect(res.body.message).to.equal('review successful sent');
//         done();
//       });
//   });
// });
