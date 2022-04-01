const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// create, find, update, delete
router.get('/', studentController.view);
router.post('/', studentController.find);





module.exports = router;