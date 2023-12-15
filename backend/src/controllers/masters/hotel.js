const HotelModel = require('../../models/masters/hotel');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');


const hotelController = {
getAllHotels: async (req, res) => {
    try {
    const hotels = await HotelModel.getAllHotels();
    return status.ResponseStatus(res, 200, 'List of all Hotels', hotels);
    } catch (error) {
    return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
},


getHotelById: async (req, res) => {
    const hotel_id = req.params.id;
    try {
    const hotel = await HotelModel.getHotelById(hotel_id);
    return status.ResponseStatus(res, 200, `Details of Hotel(${hotel_id})`, hotel);
    } catch (error) {
    return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
},


createHotel: async (req, res) => {
    const hotelData = req.body;
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, 'Validation Failed', errors);
    }
   
    const newHotelId = await HotelModel.createHotel(hotelData);
    return status.ResponseStatus(res, 201, `Hotel created with ID ${newHotelId}`);
    } catch (error) {
    return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
},


updateHotelById: async (req, res) => {
    const hotel_id = req.params.id;
    const hotelData = req.body;
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, 'Validation Failed', errors);
    }


    const affectedRows = await HotelModel.updateHotelById(hotel_id, hotelData);
    if (affectedRows === 0) {
        return status.ResponseStatus(res, 404, `Hotel with ID ${hotel_id} not found`);
    }
    return status.ResponseStatus(res, 200, `Hotel with ID ${hotel_id} updated successfully`);
    } catch (error) {
    return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
},


deleteHotelById: async (req, res) => {
    const hotel_id = req.params.id;
    try {
    const affectedRows = await HotelModel.deleteHotelById(hotel_id);
    if (affectedRows === 0) {
        return status.ResponseStatus(res, 404, `Hotel with ID ${hotel_id} not found`);
    }
    return status.ResponseStatus(res, 200, `Hotel with ID ${hotel_id} deleted successfully`);
    } catch (error) {
    return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
},
};


module.exports = hotelController;
