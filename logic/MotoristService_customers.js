const ms = require('../model/MotoristService_customers');
// const env = require('dotenv');
// env.config();
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation/customers_validation');
module.exports = {
    getCustomers: async (req, res, next) => {
        const customersSchema = await ms.find();
        res.json({
            result: customersSchema.map(res => {
                return {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    password: res.password,
                    longitude: res.longitude,
                    latitude: res.latitude,

                }
            })
        })
    },
    /////////////////////////////////////////////////////////////////////////////////////////
    // customers registration
    customerSignup: async (req, res) => {
        //registration data validation
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //checking if the customer is already in the database
        const emailExist = await ms.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email is already exists, please try another one');
        //hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create a new customer
        const customersSchema = await new ms({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
        });
        //return the creation process status (saved or error)
        try {
            const savedcustomer = await customersSchema.save();
            res.json({ "message": "inserted successfully", savedcustomer });
            // we can use <<<  res.send({id : customersSchema._id})  >>> to show specific detail
        } catch (err) {
            res.status(400).send(err);

        }
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    deleteCustomers: async (req, res) => {
        const id = req.params.id;
        const del = await ms.findByIdAndRemove(id);
        res.json({ "delete": "deleted successfully", del });
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    //login
    customerLogin: async (req, res) => {

        //logging in data validation
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //checking if the customer exist in the database
        const customer = await ms.findOne({ email: req.body.email });
        if (!customer) return res.status(400).send('Email is not found, please correct it');
        //password checking
        const validPass = await bcrypt.compare(req.body.password, customer.password);
        if (!validPass) return res.status(400).send('invalid password');

        res.send('logged in!');

        //     //create and assign a token to show that the customer is logged in 
        //     const token = jwt.sign({ _id: customer._id }, process.env.TOKEN_SIGNATURE);
        //     res.header('auth-token', token).send(token);
        //     res.send(req.customer);
        //     customer.findOne({_id:req.customer})
    },
    //////////////////////////////////////////////////////////////////////////////////////////
};