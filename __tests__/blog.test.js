var request = require('supertest');
var app = require('../app');

var {
  testDbConnect,
  dbDisconnect,
} = require('../database/mongodbMemoryServer');

beforeAll(async () => {
  await testDbConnect();
});
afterAll(async () => {
  await dbDisconnect();
});

const currentUser = {};
let currentPost = {};
describe('POST/ signup and signin', () => {
  test('test for sign up', async () => {
    const user = {
      userName: 'maximdave',
      gender: 'male',
      email: 'enoragbondavid35@gmail.com',
      password: '123456',
    };
    const res = await request(app).post('/gratis/signUp').send(user);

    currentUser._id = res.body.user._id;
    currentUser.email = res.body.user.email;
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User Created Successfully');
  });

  test('test for sign in', async () => {
    const res = await request(app).post('/gratis/sigIn').send({
      email: 'enoragbondavid35@gmail.com',
      password: '123456',
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');

    const token = res.body.token;
    currentUser.token = token;
    // console.log(token);
  });
});

describe('Create and Get Blog post', () => {
  test('User should be able to create blog post', async () => {
    const post = {
      title: 'Another Blog By Gratis',
      body: 'This is a Blog Post',
    };
    const res = await request(app)
      .post('/gratis/post')
      .send(post)
      .set('Authorization', `Bearer ${currentUser.token}`);
    currentPost._id = res.body._id;
    console.log(res.body);
    expect(res.status).toBe(201);
  });

  test('User should be able to get all Blog post', async () => {
    const res = await request(app)
      .get('/gratis/post')
      .set('Authorization', `Bearer ${currentUser.token}`);
    expect(res.status).toBe(200);
  });
});

describe('Create and Get Blog post Comment', () => {
  test('User should be able to create Comment on a blog post', async () => {
    const comment = {
      content: 'This is a comment',
    };
    const res = await request(app)
      .post(`/gratis/post/${currentPost._id}/comment`)
      .send(comment)
      .set('Authorization', `Bearer ${currentUser.token}`);
    expect(res.status).toBe(201);
  });

  test('User should be able to get all Blog post', async () => {
    const res = await request(app)
      .get('/gratis/post')
      .set('Authorization', `Bearer ${currentUser.token}`);
    expect(res.status).toBe(200);
  });
});
