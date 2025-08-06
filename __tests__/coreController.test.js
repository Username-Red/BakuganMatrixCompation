// __tests__/coreController.test.js
const { getCores, getCoreById } = require('../controllers/core');
const Core = require('../models/core');

jest.mock('../models/core'); // Automatically mocks Core model

describe('Core Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getCores', () => {
    it('should return all Core if no error', async () => {
      const mockCore = [    
        {
            "_id": "6890b737422e985d4db7e9ad",
            "type": "Magic Shield",
            "boost": "+600B"
        },
        {
            "_id": "6890b789422e985d4db7e9ae",
            "type": "Helix",
            "boost": "+300B, +3 NRG"
        },
        {
            "_id": "6890b7b2422e985d4db7e9af",
            "type": "Green Fist",
            "boost": "+100B, Pyrus/Haos: +3 NRG"
        }];
      Core.find.mockResolvedValue(mockCore);

      await getCores(req, res);

      expect(Core.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockCore);
    });

    it('should return 500 if find fails', async () => {
      const error = new Error('Database failure');
      Core.find.mockRejectedValue(error);

      await getCores(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getCoreById', () => {
    beforeEach(() => {
      req.params._id = '6890b789422e985d4db7e9ae';
    });

    it('should return a Core if found', async () => {
      const mockCore = [    
        {
            "_id": "6890b737422e985d4db7e9ad",
            "type": "Magic Shield",
            "boost": "+600B"
        },
        {
            "_id": "6890b789422e985d4db7e9ae",
            "type": "Helix",
            "boost": "+300B, +3 NRG"
        },
        {
            "_id": "6890b7b2422e985d4db7e9af",
            "type": "Green Fist",
            "boost": "+100B, Pyrus/Haos: +3 NRG"
        }];
      Core.findById.mockResolvedValue(mockCore);

      await getCoreById(req, res);

      expect(Core.findById).toHaveBeenCalledWith('6890b789422e985d4db7e9ae');
      expect(res.json).toHaveBeenCalledWith(mockCore);
    });

    it('should return 404 if not found', async () => {
      Core.findById.mockResolvedValue(null);

      await getCoreById(req, res);

      expect(Core.findById).toHaveBeenCalledWith('6890b789422e985d4db7e9ae');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Core not found' });
    });

    it('should return 400 on invalid ID format or other errors', async () => {
      const error = new Error('Invalid ID');
      Core.findById.mockRejectedValue(error);

      await getCoreById(req, res);

      expect(Core.findById).toHaveBeenCalledWith('6890b789422e985d4db7e9ae');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format or error retrieving Core' });
    });
  });
});
