// import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import app from '../index';
import web from '../models/memory';
import { signupValidation } from '../helpers/joi';

const { expect } = chai;
const user = web.web_user;


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
