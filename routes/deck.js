const express = require('express');
const router = express.Router();

const { getDecks, createDeck, updateDeck, deleteDeck } = require('../controllers/deck');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getDecks);
router.post('/', createDeck);
router.put('/:_id',  updateDeck);
router.delete('/:_id',  deleteDeck);


module.exports = router;

