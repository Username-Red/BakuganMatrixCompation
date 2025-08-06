// __tests__/gateController.test.js
const { getGate, getGateById } = require('../controllers/gate');
const Gate = require('../models/gate');

jest.mock('../models/gate'); // Automatically mocks Gate model

describe('Gate Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getGate', () => {
    it('should return all Gate if no error', async () => {
      const mockGate = [  {
            "_id": "6887737085e03a76ce780b71",
            "boosts": [
            600,
            100,
            100,
            600,
            100,
            100
            ],
            "coretype": "Orange Shield",
            "type": "Booster"
        },
        {
            "_id": "688773eb85e03a76ce780b72",
            "boosts": [
            300,
            0,
            400,
            200,
            500,
            100
            ],
            "coretype": "Orange Shield",
            "type": "Booster"
        }];
      Gate.find.mockResolvedValue(mockGate);

      await getGate(req, res);

      expect(Gate.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockGate);
    });

    it('should return 500 if find fails', async () => {
      const error = new Error('Database failure');
      Gate.find.mockRejectedValue(error);

      await getGate(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getGateById', () => {
    beforeEach(() => {
      req.params._id = '6887737085e03a76ce780b71';
    });

    it('should return a Gate if found', async () => {
      const mockGate = [  {
            "_id": "6887737085e03a76ce780b71",
            "boosts": [
            600,
            100,
            100,
            600,
            100,
            100
            ],
            "coretype": "Orange Shield",
            "type": "Booster"
        },
        {
            "_id": "688773eb85e03a76ce780b72",
            "boosts": [
            300,
            0,
            400,
            200,
            500,
            100
            ],
            "coretype": "Orange Shield",
            "type": "Booster"
        }];
      Gate.findById.mockResolvedValue(mockGate);

      await getGateById(req, res);

      expect(Gate.findById).toHaveBeenCalledWith('6887737085e03a76ce780b71');
      expect(res.json).toHaveBeenCalledWith(mockGate);
    });

    it('should return 404 if not found', async () => {
      Gate.findById.mockResolvedValue(null);

      await getGateById(req, res);

      expect(Gate.findById).toHaveBeenCalledWith('6887737085e03a76ce780b71');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Gate not found' });
    });

    it('should return 400 on invalid ID format or other errors', async () => {
      const error = new Error('Invalid ID');
      Gate.findById.mockRejectedValue(error);

      await getGateById(req, res);

      expect(Gate.findById).toHaveBeenCalledWith('6887737085e03a76ce780b71');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format or error retrieving Gate' });
    });
  });
});
