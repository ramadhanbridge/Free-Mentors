import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import { config } from 'dotenv';
import { TOKEN } from '../middleware/verify';
import app from '../index';
import web from '../models/memory.js';
import fakeuser from '../models/moch';
import { loginValidation } from '../helpers/joi';

const { expect } = chai;
const user = web.web_user;
const user_info = user[4];
const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY);

config();
chai.use(chaiHttp);


describe(' (4) signin with uncompleted information, api/v1/auth/signin', () => {
  it('should return an error', (done) => {
    const user = fakeuser.web_users;
    const user_info = user[8];
    const { error } = loginValidation(user_info);
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send(user_info)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal(`${error.details[0].message}`);
        done();
      });
  });
});

describe('(5) signin with invalid information, api/v1/auth/signin', () => {
  it('should return an error', (done) => {
    const user = fakeuser.web_users;
    const user_info = user[9];
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send(user_info)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you don\'t have account, signup please...');
        done();
      });
  });
});

describe(' (5) signin with invalid information, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    const user = fakeuser.web_users;
    const user_info = user[10];
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send(user_info)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('wrong password,reset your password ,....');
        done();
      });
  });
});


describe(' (6) signin with valid information as mentee, api/v1/auth/signin', () => {
  it('should return info', (done) => {
    const user = fakeuser.web_users;
    const user_info = user[11];
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send(user_info)
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
    const user = fakeuser.web_users;
    const user_info = user[12];
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send(user_info)
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
    const user = fakeuser.web_users;
    const user_info = user[13];
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-Type', 'application/json')
      .send(user_info)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Admin is successful signin in ');
        done();
      });
  });
});

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
