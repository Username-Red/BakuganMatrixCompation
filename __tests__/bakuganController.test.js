// __tests__/bakuganController.test.js
const { getBakugan, getBakuganById } = require('../controllers/bakugan');
const Bakugan = require('../models/bakugan');

jest.mock('../models/bakugan'); // Automatically mocks Bakugan model

describe('Bakugan Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getBakugan', () => {
    it('should return all bakugan if no error', async () => {
      const mockBakugan = [

        {
            "_id": "68876ea785e03a76ce780b69",
            "name": "Dragonoid",
            "type": "Core",
            "faction": "Aurelus",
            "power": 400,
            "damage": 2,
            "cores": ["Green Fist", "Green Fist"],
            "effect": "N/A"
        },
        {
            "_id": "68876f1785e03a76ce780b6a",
            "name": "Neo Pegatrix",
            "type": "Platinum",
            "faction": "Haos",
            "power": 200,
            "damage": 5,
            "cores": ["Red Fist", "Helix"],
            "effect": "Helix: Steal a core/gate bonus"
        }
        ]

      Bakugan.find.mockResolvedValue(mockBakugan);

      await getBakugan(req, res);

      expect(Bakugan.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockBakugan);
    });

    it('should return 500 if find fails', async () => {
      const error = new Error('Database failure');
      Bakugan.find.mockRejectedValue(error);

      await getBakugan(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getBakuganById', () => {
    beforeEach(() => {
      req.params._id = '68876ea785e03a76ce780b69';
    });

    it('should return a bakugan if found', async () => {
      const mockBakugan = [

        {
            "_id": "68876ea785e03a76ce780b69",
            "name": "Dragonoid",
            "type": "Core",
            "faction": "Aurelus",
            "power": 400,
            "damage": 2,
            "cores": ["Green Fist", "Green Fist"],
            "effect": "N/A"
        },
        {
            "_id": "68876f1785e03a76ce780b6a",
            "name": "Neo Pegatrix",
            "type": "Platinum",
            "faction": "Haos",
            "power": 200,
            "damage": 5,
            "cores": ["Red Fist", "Helix"],
            "effect": "Helix: Steal a core/gate bonus"
        }
        ]

      Bakugan.findById.mockResolvedValue(mockBakugan);

      await getBakuganById(req, res);

      expect(Bakugan.findById).toHaveBeenCalledWith('68876ea785e03a76ce780b69');
      expect(res.json).toHaveBeenCalledWith(mockBakugan);
    });

    it('should return 404 if not found', async () => {
      Bakugan.findById.mockResolvedValue(null);

      await getBakuganById(req, res);

      expect(Bakugan.findById).toHaveBeenCalledWith('68876ea785e03a76ce780b69');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Bakugan not found' });
    });

    it('should return 400 on invalid ID format or other errors', async () => {
      const error = new Error('Invalid ID');
      Bakugan.findById.mockRejectedValue(error);

      await getBakuganById(req, res);

      expect(Bakugan.findById).toHaveBeenCalledWith('68876ea785e03a76ce780b69');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format or error retrieving Bakugan' });
    });
  });
});
