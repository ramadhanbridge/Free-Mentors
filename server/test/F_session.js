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
