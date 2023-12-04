const express = require('express');
const { register, login }=require('../controller/userController')
const authenticateToken=require('../middleware/auth')
const { createAd, getAllAd, getOneAd, deleteAd, updateAd} = require('../controller/productController');

const router = express.Router();

router.post('/signup', register);
router.post('/login', login)

router.post('/postAd',authenticateToken, createAd);
router.get('/getAd',authenticateToken, getAllAd);
router.get('/getAd/:Id',authenticateToken, getOneAd);
router.delete('/deleteAd/:Id',authenticateToken, deleteAd);
router.put('/UpdateAd/:Id',authenticateToken, updateAd);


module.exports = router;
