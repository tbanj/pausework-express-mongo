const express = require('express');
const jwt = require('jsonwebtoken');
const LeaveModel = require('../models/LeaveModel');
const AuthMiddleware = require('../middlewares/auth');
const JoiValidator = require('../middlewares/validator');
const { CreateLeaveValidator } = require('../validators/LeaveValidator');
const router = express.Router();

// Create an leave
router.post(
  '/',
  AuthMiddleware,
  JoiValidator(CreateLeaveValidator),
  async function(req, res) {
    try {
      const leave = await LeaveModel.create({
        leavetype: req.body.leavetype,
        startdatefrom: req.body.startdatefrom,
        enddateto: req.body.enddateto,
        createddate: req.body.createddate,

        offdays: req.body.offdays,
        leavemessage: req.body.leavemessage,
        approvestatus: req.body.approvestatus,
        approvemessage: req.body.approvemessage,
        employee: req.user,
        
      });

      res.json({ status: 'success', data: leave });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: '🤦🏾 an error occured while creating your leave',
      });
    }
  }
);

router.put('/:id/public', AuthMiddleware, async (req, res) => {
  try {
    const leave = await LeaveModel.findByIdAndUpdate(
      {
        _id: req.params.id,
        employee: req.user,
      },
      { is_public: true },
      { new: true }
    );

    res.json({ status: 'success', data: leave });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occured while setting leave to public',
    });
  }
});

/**
 * Returns a list of public leaves
 */
router.get('/feed', async function(req, res) {
  try {
    const publicLeaves = await LeaveModel.find({ is_public: true });
    res.json({ status: 'success', data: publicLeaves });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'An error occured' });
  }
});

router.get('/:id', async function(req, res) {
  try {
    const leave = await LeaveModel.findById(req.params.id);
    res.json({ status: 'success', data: leave });
  } catch (err) {
    res
      .status(500)
      .json({ status: 'error', message: 'Could not find leave' });
  }
});

// Get all employee leaves
router.get('/', AuthMiddleware, async function(req, res) {
  try {
    const leaves = await LeaveModel.find({ employee: req.user });

    res.json({ status: 'success', data: leaves });
  } catch (err) {
    res
      .status(500)
      .json({ status: 'error', message: 'Could not find leaves!' });
  }
});

module.exports = router;
