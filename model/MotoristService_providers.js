const db = require('mongoose');
//Providers Database Creation
const providersSchema = new db.Schema
    ({
        name: { type: String, required: true, min: 6, max: 255 },
        email: { type: String, required: true, min: 6, max: 255 },
        password: { type: String, required: true, min: 6, max: 1024 },
        phone: { type: String, required: true, min: 10, max: 20 },
        longitude: { type: Number, required: true, min: 6, max: 255 },
        latitude: { type: Number, required: true, min: 6, max: 255 },
    })
module.exports = db.model
    (
        'providers', providersSchema
    ); 