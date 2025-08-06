const express = require('express');
const router = express.Router();

const { getDecks, createDeck, updateDeck, deleteDeck } = require('../controllers/deck');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getDecks);
router.post('/', isAuthenticated, createDeck);
router.put('/:_id', isAuthenticated, updateDeck);
router.delete('/:_id', isAuthenticated, deleteDeck);


module.exports = router;

