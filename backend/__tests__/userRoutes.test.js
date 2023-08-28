import mongoose from "mongoose";
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../app.js'; // Adjust the path as needed
import User from '../models/userModel.js';

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

    // Prepopulate the database with a sample document
    const sampleData = {
      name: 'John',
      email: 'john@example.com',
      password: 'Testpassword123@',
    };
    await User.create(sampleData);
  });

  // Clean up the MongoDB connection after all tests have run
  afterAll(async () => {
    // await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
  describe('given a username, email and password', () => {
      it('should register a new user', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({
            name: 'TestUser',
            email: 'test@example.com',
            password: 'Testpassword123@',
          })
        .expect('Content-Type', /json/)
        // .expect(response => {console.log(response)})
        .expect(201)
        // Add more assertions based on your API response
      });

      it('should fail to register -> user already exits', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({
            name: 'John',
            email: 'john@example.com',
            password: 'Testpassword123@',
          })
        .expect('Content-Type', /json/)
        // .expect(response => {console.log(response)})
        .expect(400)
        // Add more assertions based on your API response
      });

      it('should return an error if required fields are missing', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({
            // Missing name, email, and password fields
          })
          .expect('Content-Type', /json/)
          .expect(500);
    
        expect(response.error.text).toContain('All fields must be filled');
      });

      it('should return an error for an invalid name', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({
            name: '1234', // Invalid name containing numbers
            email: 'test@example.com',
            password: 'Testpassword123@',
          })
          .expect('Content-Type', /json/)
          .expect(500);
    
        expect(response.error.text).toContain('Name can only contain letters');
      });

      it('should return an error for an invalid email', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({
            name: 'Test User',
            email: 'invalid-email', // Invalid email format
            password: 'Testpassword123@',
          })
          .expect('Content-Type', /json/)
          .expect(500);
    
        expect(response.error.text).toContain('Email is not valid');
      });

      it('should return an error for an invalid password', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'weak', // Invalid password
          })
          .expect('Content-Type', /json/)
          .expect(500);
    
        expect(response.error.text).toContain('Password not strong enough');
      });
  })
});
