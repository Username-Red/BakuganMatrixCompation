const express = require('express');
const router = express.Router();

const { getBakugan, getBakuganById, createBakugan, updateBakugan, deleteBakugan } = require('../controllers/bakugan');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getBakugan);
router.get('/:_id', getBakuganById);
router.post('/', isAuthenticated, createBakugan);
router.put('/:_id', isAuthenticated, updateBakugan);
router.delete('/:_id', isAuthenticated, deleteBakugan);


module.exports = router;

