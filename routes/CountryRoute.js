const express = require('express');
const CountryModel = require('../models/CountryModel');
const AuthMiddleware = require('../middlewares/auth');
const JoiValidator = require('../middlewares/validator');
const { CreateCountryValidator } = require('../validators/CountryValidator');

const env = require('../env');

const router = express.Router();

router.post('/', AuthMiddleware, JoiValidator(CreateCountryValidator), async function (req, res) {
    try {
        const country = await CountryModel.create({
            ...req.body,
            created_date: new Date(),

        });

        res.json({ status: 'success', data: country });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: '🤦🏾 an error occured while adding countries',
        });
        console.error(err);
    }
});

router.get('/', async function (req, res) {
    try {
        const country = await CountryModel.find({});
        res.json({ status: 'success', data: country });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: '🤦🏾 an error occured while fetching countries',
        });
        console.error(err);
    }
});

module.exports = router;