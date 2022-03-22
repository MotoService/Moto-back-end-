const express = require('express');
const router = express.Router();
//+customers
const { getCustomers, customerSignup, deleteCustomers, customerLogin } = require('../logic/MotoristService_customers');
router.get('/customers', getCustomers);
router.post('/customers/register', customerSignup);
router.delete('/customers/:id', deleteCustomers);
router.post('/customers/login', customerLogin);
//+providers
const { getProviders, providerSignup, deleteProviders, providerLogin } = require('../logic/MotoristService_providers');
router.get('/providers', getProviders);
router.post('/providers/register', providerSignup);
router.delete('/providers/:id', deleteProviders);
router.post('/providers/login', providerLogin);

module.exports = router;