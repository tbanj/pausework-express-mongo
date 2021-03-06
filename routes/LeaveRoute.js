const express = require('express');
const EmployeeModel = require('../models/EmployeeModel');
const LeaveModel = require('../models/LeaveModel');
const AuthMiddleware = require('../middlewares/auth');
const JoiValidator = require('../middlewares/validator');
const { CreateLeaveValidator } = require('../validators/LeaveValidator');
const env = require('../env');
const router = express.Router();

// Create a leave
router.post(
  '/',
  AuthMiddleware,
  JoiValidator(CreateLeaveValidator),
  async function (req, res) {
    try {
      const leave = await LeaveModel.create({

        // using spread operator 
        ...req.body,
        created_date: new Date(),
        employee: req.user,

      });

      res.json({ status: 'success', data: leave });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: '🤦🏾 an error occured while creating your leave',
      });
      console.error(err);
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




// Get all employee leaves for a particular user
router.get('/user', AuthMiddleware, async function (req, res) {
  try {
    const leaves = await LeaveModel.find({ employee: req.user });
    res.json({ status: 'success', data: leaves });
  } catch (err) {
    res
      .status(500)
      .json({ status: 'error', message: 'Could not find leaves for this user!' });
  }
});

// Get all leaves for a particular user & query based on its fields
router.get('/query', AuthMiddleware, async function (req, res) {

  try {
    let searchAdd = {};

    searchAdd["employee"] = req.user;

    if (Object.keys(req.query).length > 0 && req.query.constructor === Object) {
      switch (true) {
        case Object.keys(req.query)[0].toString() === "off_days":
          const off_day = req.query.leave_type ? { off_days: req.query.off_days } : {};
          searchAdd["off_days"] = off_day["off_days"];
          break;

        case Object.keys(req.query)[0].toString() === "leave_type":
          const leaveType = req.query.leave_type ? { leave_type: req.query.leave_type } : {};
          searchAdd["leave_type"] = leaveType["leave_type"];
          break;

        case Object.keys(req.query)[0].toString() === "approve_status":
          const approve_status = req.query.approve_status ? { approve_status: req.query.approve_status } : {};
          searchAdd["approve_status"] = approve_status['approve_status'];
          break;

        default:
          console.log('params is not acceptable');
          break;
      }

    } else { }

    const leaves = await LeaveModel.find(searchAdd);
    res.json({
      status: 'succcess',
      data: leaves,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "An error occured while getting leaves's of a user",
    });
  }
});


router.get('/:id', async function (req, res) {
  try {
    const getleave = await LeaveModel.findById(req.params.id);
    res.json({ status: 'success', data: getleave });
  } catch (err) {
    res
      .status(500)
      .json({ status: 'error', message: 'Could not find leave' });
  }
});


router.get('', AuthMiddleware, async function (req, res) {
  try {
    const user = await EmployeeModel.findOne({ '_id': req.user });
    console.log(Object.keys(req.query).length);
    if (user.admin_key === env.admin_key) {
      if (user.admin_key !== env.admin_key && req.is_admin !== true) {
        res.status(400).json({ status: 'error', message: 'you are not an admin' })
        console.log("aaa" + user.admin_key + " :" + env.admin_key)
        return;
      }

      let search = {}

      console.log(req.query, Object.keys(req.query).length);
      if (Object.keys(req.query).length < 1) {
        const leaves = await LeaveModel.find({});
        res.status(200).json({ status: 'success', data: leaves });
        return;
      }

      else if (Object.keys(req.query).length > 0 && req.query.constructor === Object) {

        searchAdd = {};
        switch (true) {
          case Object.keys(req.query)[0].toString() === "approve_status":
            const approve_status = req.query.approve_status ? { approve_status: req.query.approve_status } : {};
            searchAdd["approve_status"] = approve_status['approve_status'];
            break;

          case Object.keys(req.query)[0].toString() === "leave_type":
            const leaveType = req.query.leave_type ? { leave_type: req.query.leave_type } : {};
            searchAdd["leave_type"] = leaveType['leave_type'];
            break;

          case Object.keys(req.query)[0].toString() === "approved_by":
            const approvedBy = req.query.approved_by ? { approved_by: req.query.approved_by } : {};
            searchAdd["approved_by"] = approvedBy['approved_by'];
            break;

          case Object.keys(req.query)[0].toString() === "off_days":
            const off_days = req.query.off_days ? { off_days: req.query.off_days } : {};
            searchAdd["off_days"] = off_days['off_days'];
            break;

          case Object.keys(req.query.leave_type) === "leave_type" && Object.keys(req.query.approve_status) === "approve_status":
            const searchleavetypeJoin = req.query.leave_type ? { leave_type: req.query.leave_type } : {};
            searchAdd["leave_type"] = searchleavetypeJoin["leave_type"];
            const searchapprovestatusJoin = req.query.approve_status ? { approve_status: req.query.approve_status } : {};
            searchAdd["approve_status"] = searchapprovestatusJoin["approve_status"];
            break;

          default:
            console.log('params not acceptable');
        }
        const leaves = await LeaveModel.find(searchAdd);

        res.status(200).json({ status: 'success', data: leaves })
        return;
      }
      else {
        console.log(':🤦🏾 🎆 its null');
        return;

      }
    } else {
      res.status(403).json({ status: 'error', message: 'provide admin key' })
    }


  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "An error occured while getting leaves's for all users",
    });
  }
});
module.exports = router;
