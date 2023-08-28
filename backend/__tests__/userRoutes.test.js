import mongoose from "mongoose";
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../app.js'; // Adjust the path as needed

describe('User Registration API', () => {
  // Initialize the MongoDB connection before running tests
  beforeAll(async () => {
    dotenv.config({ path: '.env.development' });
    const testDbUri = process.env.MONGO_URI;
    await mongoose.connect(testDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  //deletes all documents before each test runs
  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  // Clean up the MongoDB connection after all tests have run
  afterAll(async () => {
    // await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
      })
    .expect('Content-Type', /json/)
    // .expect(response => {console.log(response)})
    .expect(201)
    // Add more assertions based on your API response
  });
});
