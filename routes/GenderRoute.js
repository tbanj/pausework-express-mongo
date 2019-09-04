const express = require('express');
const GenderModel = require('../models/GenderModel');
const AuthMiddleware = require('../middlewares/auth');
const JoiValidator = require('../middlewares/validator');
const { CreateGenderValidator } = require('../validators/GenderValidator');

const env = require('../env');

const router = express.Router();

router.post('/', AuthMiddleware, JoiValidator(CreateGenderValidator), async function (req, res) {
    try {
        const gender = await GenderModel.create({
            ...req.body,
            created_date: new Date(),

        });

        res.json({ status: 'success', data: gender });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: '🤦🏾 an error occured while adding genders',
        });
        console.error(err);
    }
});

router.get('/', async function (req, res) {
    try {
        const gender = await GenderModel.find({});

        res.json({ status: 'success', data: gender });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: '🤦🏾 an error occured while fetching genders',
        });
        console.error(err);
    }
});

module.exports = router;