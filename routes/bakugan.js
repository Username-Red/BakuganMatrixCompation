const express = require('express');
const router = express.Router();

const { getBakugan, createBakugan, updateBakugan, deleteBakugan } = require('../controllers/bakugan');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getBakugan);
router.post('/', createBakugan);
router.put('/:_id',  updateBakugan);
router.delete('/:_id',  deleteBakugan);


module.exports = router;

