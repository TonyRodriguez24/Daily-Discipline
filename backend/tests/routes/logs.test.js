// Mock the auth middleware so requests are treated as authenticated
jest.mock('../../middleware/auth', () => ({
    authenticateJWT: (req, res, next) => {
        req.user = { id: 1 };
        return next();
    }
}));

jest.mock('../../models/log');

const request = require('supertest');
const Log = require('../../models/log');
const app = require('../../app');

describe('Logs routes', () => {
    beforeEach(() => jest.clearAllMocks());

    test('POST /logs creates a new log and returns 201', async () => {
        const newLog = { id: 10, date: '2025-11-11', did_workout: true };
        Log.createLog.mockResolvedValueOnce(newLog);

        const resp = await request(app)
            .post('/logs')
            .send({ date: '2025-11-11', didWorkout: true });

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual(newLog);
        expect(Log.createLog).toHaveBeenCalled();
    });

    test('GET /logs returns list of logs for user', async () => {
        const rows = [{ id: 11, date: '2025-01-01' }];
        Log.getAll.mockResolvedValueOnce(rows);

        const resp = await request(app).get('/logs');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(rows);
    });

    test('GET /logs/:id returns a single log', async () => {
        const log = { date: '2025-01-02', did_workout: false };
        Log.getLogById.mockResolvedValueOnce(log);

        const resp = await request(app).get('/logs/5');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(log);
    });

    test('PATCH /logs/:id updates and returns log', async () => {
        const updated = { id: 5, weight: 160 };
        Log.updateLog.mockResolvedValueOnce(updated);

        const resp = await request(app)
            .patch('/logs/5')
            .send({ weight: 160 });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ log: updated });
    });

    test('DELETE /logs/:id returns deleted log id', async () => {
        const deleted = { id: 6 };
        Log.deleteLog.mockResolvedValueOnce(deleted);

        const resp = await request(app).delete('/logs/6');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ log: deleted });
    });
});
