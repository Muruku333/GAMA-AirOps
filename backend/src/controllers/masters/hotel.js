const HotelModel = require('../../models/masters/hotel');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');


const hotelController = {
    createHotel: async (req, res) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return status.ResponseStatus(res, 400, 'Validation Failed', errors);
        }
       const {hotelName, address, cityId,phoneNo,email, createdBy}= req.body;
       const hotel ={
        hotel_name:hotelName,
        address,
        city_id: cityId,
        phone_no: phoneNo,
        email,
        created_by:createdBy,
        modified_by: createdBy,
       }
        const result = await HotelModel.createHotel(hotel);
        if(result.insertId>0){
            return status.ResponseStatus(res, 201, `Hotel created successfully`);
        }
        return status.ResponseStatus(res, 400, `Failed to create hotel`);
        } catch (error) {
        return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
        }
    },

getAllHotels: async (req, res) => {
    try {
    const rows = await HotelModel.getAllHotelsWithCity();
    if(rows.length>0){
        let hotels =[];
        rows.map((row)=>{
            const {
                id,
                hotel_id,
                hotel_name,
                address,
                phone_no,
                email,
                city_id,
                city_name,
                zone_id,
                country_id,
            }= row;
    
            hotels =[
                ...hotels,
                {
                    id,
                    hotel_id,
                    hotel_name,
                    address,
                    phone_no,
                    email,
                    city:{
                        city_id,
                        city_name,
                        zone_id,
                        country_id,
                    }
                }
            ];
        });
        return status.ResponseStatus(res, 200, 'List of all Hotels', hotels);
    }
    return status.ResponseStatus(res,400,"No data found");
    } catch (error) {
    return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
},

getHotelByHotelId: async (req, res) => {
    
    try {
        const hotel_id = req.params.hotel_id;

    const rows = await HotelModel.getHotelByHotelIdWithCity(hotel_id);
    if(rows.length>0){
            const {
                id,
                hotel_id,
                hotel_name,
                address,
                phone_no,
                email,
                city_id,
                city_name,
                zone_id,
                country_id,
            }= rows[0];
    
           const hotel =[
                {
                    id,
                    hotel_id,
                    hotel_name,
                    address,
                    phone_no,
                    email,
                    city:{
                        city_id,
                        city_name,
                        zone_id,
                        country_id,
                    }
                }
            ];
        return status.ResponseStatus(res, 200, `Details of Hotel(${hotel_id})`, hotel);
    }
    return status.ResponseStatus(res,400,`No data found for ${hotel_id}`);
    } catch (error) {
    return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
},

updateHotelByHotelId: async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return status.ResponseStatus(res, 400, "Validation Failed", errors);
        }
        const hotel_id = req.params.hotel_id;
        const { hotelName, address,cityId,phoneNo,email, modifiedBy } = req.body;
        const hotel ={
            hotel_name:hotelName,
            address,
            city_id: cityId,
            phone_no: phoneNo,
            email,
            modified_by:modifiedBy,
           }
        const result = await HotelModel.updateHotelByCondition({hotel_id}, hotel);
        if (result.affectedRows > 0) {
            return status.ResponseStatus(res, 200, `Hotel updated successfully`);
        }
        return status.ResponseStatus(res, 404, `Failed to update Delay Explanation`);
        } catch (error) {
        return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
},


deleteHotelByHotelId: async (req, res) => {
    const hotel_id = req.params.hotel_id;
    try {
    const result = await HotelModel.deleteHotelByCondition({hotel_id});
    if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, `Hotel deleted successfully`);
    }
    return status.ResponseStatus(res, 404, `Failed to delete hotel`);
    } catch (error) {
    return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
},
};


module.exports = hotelController;
