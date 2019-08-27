const express = require('express');
const jwt = require('jsonwebtoken');
const LeaveRequestReplyModel = require('../models/LeaveRequestReply');
const AuthMiddleware = require('../middlewares/auth');
const JoiValidator = require('../middlewares/validator');
const { CreateLeaveRequestReplyValidator } = require('../validators/LeaveRequestReply.js');
const env = require('../env');
const router = express.Router();

// Create a leave
router.post(
    '/',
    AuthMiddleware,
    JoiValidator(CreateLeaveRequestReplyValidator),
    async function (req, res) {

        try {
            const leaveRequest = await LeaveRequestReplyModel.create({
                ...req.body,
                created_date: new Date(),
                created_by: req.user,

            });

            res.json({ status: 'success', data: leaveRequest });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: '🤦🏾 an error occured while creating your leave request replies',
            });
            console.error(err);
        }
    }
);



router.get('/', AuthMiddleware, async function (req, res) {
    try {

        const searchContent = req.query.leave_id ? { leave_id: req.query.leave_id } : {};
        const getLeaveRequest = await LeaveRequestReplyModel.find(searchContent);
        console.log(getLeaveRequest);

        res.json({ status: 'success', data: getLeaveRequest });
    } catch (err) {
        res.status(500)
            .json({ status: 'error', message: 'Could not find leave' });
    }
});





module.exports = router;
