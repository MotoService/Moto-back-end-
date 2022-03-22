const number = require('@hapi/joi/lib/types/number');
const db = require('mongoose');
//customers Database Creation
const customersSchema = new db.Schema
        ({
                name: { type: String, required: true, min: 6, max: 255 },
                email: { type: String, required: true, min: 6, max: 255 },
                password: { type: String, required: true, min: 6, max: 1024 },
                phone: { type: String, required: true, min: 10, max: 20 },
        })

module.exports = db.model
        (
                'customers', customersSchema
        );


