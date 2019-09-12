// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import jwt from 'jsonwebtoken';

// import { config } from 'dotenv';
// import { TOKEN } from '../middleware/verify';
// import app from '../index';
// import web from '../models/memory.js';
// import fakeuser from '../models/moch';
// import { signupValidation, loginValidation } from '../helpers/joi';

// const { expect } = chai;
// const user = web.web_user;
// const user_info = user[4];
// const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY);

// config();
// chai.use(chaiHttp);


// describe(' (24) signin with invalid information as mentor', () => {
//   const user_info = user[4];
//   const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .patch('/api/v1/1/accept')
//       .set('authorization', admin_token)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(403);
//         expect(res.body.status).to.equal(403);
//         expect(res.body.message).to.equal('forbidden, not mentor..');
//         done();
//       });
//   });
// });

// describe(' (25) signin with valid information as mentor and session not available', () => {
//   const user_info = user[3];
//   const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .patch('/api/v1/-1/accept')
//       .set('authorization', mentor_token)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(404);
//         expect(res.body.status).to.equal(404);
//         expect(res.body.message).to.equal('session does not exist');
//         done();
//       });
//   });
// });

// describe(' (26) signin with valid information as mentor and session available,', () => {
//   const user_info = user[3];
//   const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .patch('/api/v1/1/accept')
//       .set('authorization', mentor_token)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(200);
//         expect(res.body.status).to.equal(200);
//         done();
//       });
//   });
// });


// describe(' (27) signin with invalid information as mentor to reject session', () => {
//   const user_info = user[4];
//   const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .patch('/api/v1/1/reject')
//       .set('authorization', admin_token)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(403);
//         expect(res.body.status).to.equal(403);
//         expect(res.body.message).to.equal('forbidden, not mentor..');
//         done();
//       });
//   });
// });

// describe(' (28) signin with valid information as mentor and session not available(reject)', () => {
//   const user_info = user[3];
//   const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .patch('/api/v1/-1/reject')
//       .set('authorization', mentor_token)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(404);
//         expect(res.body.status).to.equal(404);
//         expect(res.body.message).to.equal('session does not exist');
//         done();
//       });
//   });
// });

// describe(' (29) signin with valid information as mentor and session available,(reject)', () => {
//   const user_info = user[3];
//   const mentor_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
//   it('should return info', (done) => {
//     chai.request(app)
//       .patch('/api/v1/2/reject')
//       .set('authorization', mentor_token)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(200);
//         expect(res.body.status).to.equal(200);
//         done();
//       });
//   });
// });
