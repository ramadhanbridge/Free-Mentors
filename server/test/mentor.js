import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import db_init from '../models/db';
import { config } from 'dotenv';
import app from '../index';
import fakeuser from '../models/moch';
const { expect } = chai;
const user = fakeuser.web_users;

config();
chai.use(chaiHttp);
db_init.create_tables();

describe(' (24) signin with invalid information as mentor', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v2/1/accept')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        done();
      });
  });
});


describe(' (27) signin with invalid information as mentor to reject session', () => {
  const user_info = user[4];
  const admin_token = jwt.sign({ user_info }, process.env.PASS_KEY, { expiresIn: '1h' });
  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v2/1/reject')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        done();
      });
  });
});

