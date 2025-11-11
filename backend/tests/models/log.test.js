const db = require('../../db');
const Log = require('../../models/log');
const ExpressError = require('../../expressError');

jest.mock('../../db');

describe('Log model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll returns rows', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 1, date: '2025-01-01' }] });
    const res = await Log.getAll(1);
    expect(res).toEqual([{ id: 1, date: '2025-01-01' }]);
    expect(db.query).toHaveBeenCalled();
  });

  test('createLog inserts and returns row', async () => {
    const row = { id: 2, user_id: 1, date: '2025-01-02' };
    db.query.mockResolvedValueOnce({ rows: [row] });
    const res = await Log.createLog(1, '2025-01-02', true, 8, 5, 2, 180);
    expect(res).toEqual(row);
  });

  test('getLogById returns row when found', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ date: '2025-01-01', did_workout: true }] });
    const res = await Log.getLogById(1, 1);
    expect(res).toEqual({ date: '2025-01-01', did_workout: true });
  });

  test('getLogById throws when not found', async () => {
    db.query.mockResolvedValueOnce({ rows: [] });
    await expect(Log.getLogById(1, 999)).rejects.toThrow('No log was found for this id');
  });

  test('updateLog throws when no fields provided', async () => {
    await expect(Log.updateLog(1, 1, {})).rejects.toThrow('No data provided');
  });

  test('updateLog returns updated row', async () => {
    const updated = { id: 3, weight: 170 };
    db.query.mockResolvedValueOnce({ rows: [updated] });
    const res = await Log.updateLog(1, 3, { weight: 170 });
    expect(res).toEqual(updated);
  });

  test('deleteLog returns deleted id row', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 4 }] });
    const res = await Log.deleteLog(1, 4);
    expect(res).toEqual({ id: 4 });
  });
});
