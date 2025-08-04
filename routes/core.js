const express = require('express');
const router = express.Router();

const { getCore, createCore, updateCore, deleteCore } = require('../controllers/core');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getCore);
router.post('/', createCore);
router.put('/:_id',  updateCore);
router.delete('/:_id',  deleteCore);


module.exports = router;

