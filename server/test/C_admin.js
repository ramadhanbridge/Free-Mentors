import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import { config } from 'dotenv';
import { TOKEN } from '../middleware/verify';
import app from '../index';
import web from '../models/memory.js';
import fakeuser from '../models/moch';
import { signupValidation, loginValidation } from '../helpers/joi';

const { expect } = chai;
const user = web.web_user;
const user_info = user[4];
const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY);

config();
chai.use(chaiHttp);

describe(' (10) signin with invalid information as admin, api/v1/auth/signin', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY);
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
        expect(res.body.error).to.equal('user does not exist');
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
        expect(res.body.error).to.equal('session does not exist');
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
        done();
      });
  });
});
