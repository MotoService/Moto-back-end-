const ms = require('../model/MotoristService_providers');
// const env = require('dotenv');
// env.config();
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation/providers_validation')
module.exports = {
    getProviderslatlng: async (req, res, next) => {
        const providersSchema = await ms.find();
        res.json({
            result: providersSchema.map(res => {
                return {
                    ln: res.longitude,
                    lat: res.latitude,
                }

            })
        })
    },
    getProviders: async (req, res, next) => {
        const providersSchema = await ms.find();
        res.json({
            result: providersSchema.map(res => {
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
    //Providers registration
    providerSignup: async (req, res) => {
        //registration data validation
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //checking if the provider is already in the database
        const emailExist = await ms.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email is already exists, please try another one');
        //hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create a new provider
        const providersSchema = await new ms({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
        });
        //return the creation process status (saved or error)
        try {
            const savedprovider = await providersSchema.save();
            res.json({ "message": "inserted successfully", savedprovider });
            // we can use <<<  res.send({id : providersSchema._id})  >>> to show specific detail 

        } catch (err) {
            res.status(400).send(err);

        }
    },
    /////////////////////////////////////////////////////////////////////////////////////////
    deleteProviders: async (req, res) => {
        const id = req.params.id;
        const del = await ms.findByIdAndRemove(id);
        res.json({ "delete": "deleted sucsessfuly", del });
    },
    /////////////////////////////////////////////////////////////////////////////////////////
    //Providers login
    providerLogin: async (req, res) => {
        //logging in data validation
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //checking if the provider exist in the database
        const provider = await ms.findOne({ email: req.body.email });
        if (!provider) return res.status(400).send('Email is not found, please correct it');
        //password checking
        const validPass = await bcrypt.compare(req.body.password, provider.password);
        if (!validPass) return res.status(400).send('invalid password');

        res.send('logged in!')

        //     //create and assign a token to show that the provider is logged in 
        //     const token = jwt.sign({ _id: provider._id }, process.env.TOKEN_SIGNATURE);
        //     res.header('auth-token', token).send(token);
        //     res.send(req.provider);
        //     provider.findOne({_id:req.provider})

    }
}
console.log(this.getProviderslatlng);