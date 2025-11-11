const request = require('supertest');
const app = require('../../app');

// Skip integration tests when DB_URI not provided (useful for local unit runs)
if (!process.env.DB_URI) {
    describe.skip('Integration tests (DB not configured)', () => { })
} else {
    describe('Backend integration tests', () => {
        let token;
        const username = `testuser_${Date.now()}`;

        test('register -> login -> create log -> get logs', async () => {
            // register
            const reg = await request(app).post('/auth/register').send({ username, password: 'pass' });
            expect(reg.statusCode).toBe(201);

            // login
            const login = await request(app).post('/auth/login').send({ username, password: 'pass' });
            expect(login.statusCode).toBe(200);
            token = login.body.token;
            expect(token).toBeTruthy();

            // create log
            const newLog = { date: '2025-11-11', didWorkout: true, sleepHours: 7 };
            const create = await request(app).post('/logs').set('Authorization', `Bearer ${token}`).send(newLog);
            expect(create.statusCode).toBe(201);

            // get logs
            const logs = await request(app).get('/logs').set('Authorization', `Bearer ${token}`);
            expect(logs.statusCode).toBe(200);
            expect(Array.isArray(logs.body)).toBe(true);
        }, 20000);
    });
}
