const express = require('express');
const hotelController = require('../../controllers/masters/hotel');
const router = express.Router();
const validation = require('../../middlewares/masters/hotelValidator');


router
.route('/hotels')
.get(hotelController.getAllHotels)
.post(validation.createHotel, hotelController.createHotel);


router
.route('/hotels/:id')
.get(hotelController.getHotelById)
.put(validation.updateHotelById, hotelController.updateHotelById)
.delete(hotelController.deleteHotelById);


module.exports = router;
