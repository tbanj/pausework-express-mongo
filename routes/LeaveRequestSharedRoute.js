const express = require('express');
const jwt = require('jsonwebtoken');
const LeaveRequestShared = require('../models/LeaveRequestShared');
const AuthMiddleware = require('../middlewares/auth');
const JoiValidator = require('../middlewares/validator');
const { CreateLeaveRequestSharedValidator } = require('../validators/LeaveRequestSharedValidator');
const env = require('../env');
const router = express.Router();

// Create a leave
router.post(
    '/',
    AuthMiddleware,
    JoiValidator(CreateLeaveRequestSharedValidator),
    async function (req, res) {
        try {
            const leaveRequestShared = await LeaveRequestShared.create({

                // using spread operator 
                ...req.body,
                created_date: new Date(),
                has_seen: 0,
                created_by: req.user

            });

            res.json({ status: 'success', data: leaveRequestShared });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: '🤦🏾 an error occured while creating your leave',
            });
            console.error(err);
        }
    }
);

router.get('/', AuthMiddleware, async function (req, res) {
    try {
        const getSharedleave = await LeaveRequestShared.find({});
        res.status(200).json({
            status: 'success',
            data: getSharedleave
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occured while fetching leave request datas'
        })
    }
})

router.put('/:id/update', AuthMiddleware, async (req, res) => {
    try {
        const updateRequestShared = await LeaveRequestShared.findByIdAndUpdate(
            {
                _id: req.params.id,
                employee: req.user,
            },
            {
                updated_date: new Date(),
                has_seen: 1,

            },
        );

        res.json({ status: 'success', data: updateRequestShared });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'An error occured while setting leave to public',
        });
    }
});


module.exports = router;
