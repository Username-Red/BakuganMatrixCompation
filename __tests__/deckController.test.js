// __tests__/deckController.test.js
const { getDecks, getDeckById } = require('../controllers/deck');
const Deck = require('../models/deck');

jest.mock('../models/deck'); // Automatically mocks Deck model

describe('Deck Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getDecks', () => {
    it('should return all Deck if no error', async () => {
      const mockDeck = [    
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
      Deck.find.mockResolvedValue(mockDeck);

      await getDecks(req, res);

      expect(Deck.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockDeck);
    });

    it('should return 500 if find fails', async () => {
      const error = new Error('Database failure');
      Deck.find.mockRejectedValue(error);

      await getDecks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  
});
