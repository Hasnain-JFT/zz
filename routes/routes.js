const express = require('express');
const router = express.Router();
const commonController = require('../controllers/commonController');
const middleware = require('../middleware/auth');

router.get('/', commonController.home);

router.post('/add', commonController.addData);

router.put('/update', middleware.authToken, commonController.updateClient);

router.get('/getData', middleware.authToken, commonController.getData);

router.get('/getToken', commonController.getToken);

router.get('*', commonController.page404);


module.exports = router;