import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import app from '../index';
import fakeuser from '../models/moch';
import {loginValidation,signupValidation } from '../helpers/joi';

const { expect } = chai;
const user = fakeuser.web_users;

config();
chai.use(chaiHttp);



describe('(1) signup with completed  information', () => {
  it('should return an info', (done) => {
    const user = fakeuser.web_users;
    const user_info = user[7];
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Content-Type', 'application/json')
      .send(user_info)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        done();
      });
  });
});



describe(' (2) signup with uncompleted information', () => {
  it('should return an error', (done) => {
    const user = fakeuser.web_users;
    const user_info = user[6];
    const { error } = signupValidation(user_info);
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Content-Type', 'application/json')
      .send({ id: 7, email: 'f' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal(`${error.details[0].message}`);
        done();
      });
  });
});

describe('(3) signup with existing email', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Content-Type', 'application/json')
      .send(user[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('email already exist ');
        done();
      });
  });
});


describe(' (4) signin with uncompleted information, api/v1/auth/signin', () => {
  it('should return an error', (done) => {
    const user = fakeuser.web_users;
    const user_info = user[8];
    const { error } = loginValidation(user_info);
    chai.request(app)
      .post('/api/v2/auth/signin')
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

describe('(5) signin with invalid information, api/v2/auth/signin', () => {
  it('should return an error', (done) => {
    const user = fakeuser.web_users;
    const user_info = user[9];
    chai.request(app)
      .post('/api/v2/auth/signin')
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
    const user_info = user[15];
    chai.request(app)
      .post('/api/v2/auth/signin')
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
    const user_info = user[14];
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Content-Type', 'application/json')
      .send(user_info)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('successfully logged in');
        done();
      });
  });
});

