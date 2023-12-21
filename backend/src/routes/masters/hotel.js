const express = require('express');
const hotelController = require('../../controllers/masters/hotel');
const router = express.Router();
const validation = require('../../middlewares/masters/hotelValidator');


router
.route('/hotels')
.get(hotelController.getAllHotels)
.post(validation.createHotel, hotelController.createHotel);


router
.route('/hotels/:hotel_id')
.get(hotelController.getHotelByHotelId)
.put(validation.updateHotelById, hotelController.updateHotelByHotelId)
.delete(hotelController.deleteHotelByHotelId);


module.exports = router;
