import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { File, fileRouter } from '../../src/index';

describe('File Rest API', () => {
  const file = File.fake();
  const { bucket } = file;

  const options = {
    pathSingle: '/files/:bucket/:id',
    pathList: '/files/:bucket',
    pathSchema: '/files/:bucket/schema/',
  };

  before(() => clearHttp());

  before(done => clear(done));

  it('should handle HTTP POST on /files', done => {
    const { testPost } = testRouter(options, fileRouter);
    testPost({ bucket, ...file.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new File(body);
        expect(created._id).to.exist.and.be.eql(file._id);
        expect(created.name).to.exist.and.be.eql(file.name);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /files', done => {
    const { testGet } = testRouter(options, fileRouter);
    testGet({ bucket })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /files/:id', done => {
    const { testGet } = testRouter(options, fileRouter);
    const params = { bucket, id: file._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new File(body);
        expect(found._id).to.exist.and.be.eql(file._id);
        expect(found.name).to.exist.and.be.eql(file.name);
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /files/id:', done => {
    const { testPatch } = testRouter(options, fileRouter);
    const { description } = file.fakeOnly('description');
    const params = { bucket, id: file._id.toString() };
    testPatch(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new File(body);
        expect(patched._id).to.exist.and.be.eql(file._id);
        expect(patched.name).to.exist.and.be.eql(file.name);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /files/id:', done => {
    const { testPut } = testRouter(options, fileRouter);
    const { description } = file.fakeOnly('description');
    const params = { bucket, id: file._id.toString() };
    testPut(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new File(body);
        expect(patched._id).to.exist.and.be.eql(file._id);
        expect(patched.name).to.exist.and.be.eql(file.name);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /files/id:', done => {
    const { testDelete } = testRouter(options, fileRouter);
    const params = { bucket, id: file._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new File(body);
        expect(patched._id).to.exist.and.be.eql(file._id);
        expect(patched.name).to.exist.and.be.eql(file.name);
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clear(done));
});
