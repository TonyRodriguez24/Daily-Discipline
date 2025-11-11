jest.mock('../../db');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const request = require('supertest');
const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../../app');

describe('Auth routes', () => {
    beforeEach(() => jest.clearAllMocks());

    test('POST /auth/register creates a user and returns username', async () => {
        bcrypt.hash.mockResolvedValue('hashedpw');
        db.query.mockResolvedValueOnce({ rows: [{ username: 'alice' }] });

        const resp = await request(app)
            .post('/auth/register')
            .send({ username: 'alice', password: 'password' });

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ username: 'alice' });
        expect(bcrypt.hash).toHaveBeenCalled();
    });

    test('POST /auth/login returns token when credentials valid', async () => {
        const userRow = { id: 7, username: 'bob', password: 'hashedpw' };
        db.query.mockResolvedValueOnce({ rows: [userRow] });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('tok123');

        const resp = await request(app)
            .post('/auth/login')
            .send({ username: 'bob', password: 'secret' });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: 'logged in', token: 'tok123' });
        expect(bcrypt.compare).toHaveBeenCalled();
        expect(jwt.sign).toHaveBeenCalled();
    });
});
