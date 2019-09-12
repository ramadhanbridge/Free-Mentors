import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import app from '../index';
import fakeuser from '../models/moch';
import db_init from '../models/db';
const { expect } = chai;
const user =fakeuser.web_users;

let mentee_token = '';

config();
chai.use(chaiHttp);
db_init.create_tables();
describe(' (10) signin with invalid information as admin, api/v2/auth/signin', () => {
   before(() => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send({ email: 'ramadhan@gmail.com', password: 'ramadhan' })
      .then((res) => {
        mentee_token = res.body.data.token;
      })
      .catch((err) => console.log(err));
  });

  it('should return info', (done) => {
    chai.request(app)
      .patch('/api/v2/user/4')
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
      .patch('/api/v2/user/1000000')
      .set('authorization', admin_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('mentee does not exist');
        done();
      });
  });
});
