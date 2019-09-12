import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import db_init from '../models/db';
import { config } from 'dotenv';
import app from '../index';
import fakeuser from '../models/moch';


const { expect } = chai;
const user = fakeuser.web_users;
const user_info = user[4];


config();
chai.use(chaiHttp);
db_init.create_tables();

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




describe(' (19) signin with valid information  to make session request with invalid input', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('authorization', mentee_token)
      .send({ mentorId: '3', mentor_name: 'ezila' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});


describe(' (20) signin with valid information  to make session request with valid input', () => {
  const user_info = user[1];
  const mentee_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('authorization', mentee_token)
      .send({ mentorId: '3', mentor_name: 'ezila', question: 'tell me why dev' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
       done();
      });
  });
});


