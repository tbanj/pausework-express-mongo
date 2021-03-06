const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeModel = require('../models/EmployeeModel');
const AuthMiddleware = require('../middlewares/auth');
const JoiValidator = require('../middlewares/validator');
const { CreateEmployeeAdminValidator } = require('../validators/EmployeeAdminValidator');
const { CreateEmployeeValidator } = require('../validators/EmployeeValidator');

const env = require('../env');

const router = express.Router();

// an employee signup
router.post('/',
  JoiValidator(CreateEmployeeValidator),
  async function (req, res) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const employee = await EmployeeModel.create({
        ...req.body,
        created_date: new Date(),
        is_admin: false,
      });

      const result = employee.toJSON();
      delete result.password;
      const token = jwt.sign({ id: employee.id }, env.jwt_secret, {
        expiresIn: '50s',
      });

      res.status(200).json({
        status: 'success',
        data: { employee: result, token },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: 'An error occured while creating your account 😭',
      });
    }
  });


// admin signup
router.post('/admin',
  JoiValidator(CreateEmployeeAdminValidator),
  async function (req, res) {
    try {
      if (req.body.admin_key !== env.admin_key) {
        return res.status(400).send("Invalid Admin key.");
      }

      const user = await EmployeeModel.findOne({ email: req.body.email });
      if (user) return res.status(400).send("email already registered.");

      req.body.password = await bcrypt.hash(req.body.password, 10);
      const employee = await EmployeeModel.create({
        ...req.body,
        created_date: new Date(),
        is_admin: true,
      });
      const result = employee.toJSON();
      delete result.password;
      const token = jwt.sign({ id: employee.id }, env.jwt_secret, {
        expiresIn: '1h',
      });
      res.status(200).json({
        status: 'success',
        data: { employee: result, token },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: 'An error occured while creating your account 😭',
      });
    }
  });


// Get's a employee's profile
router.get('/profile', AuthMiddleware, async function (req, res) {
  try {
    //@ts-ignore
    const employee = await EmployeeModel.findById(req.user);
    const result = employee.toJSON();
    delete result.password;

    res.json({ status: 'success', data: result });
  } catch (err) {
    console.log(err);

    res.status(401).json({ status: 'error', message: err.message });
  }
});


router.get('/query-employee', async function (req, res) {
  try {
    //@ts-ignore
    const employee = await EmployeeModel.findById(req.query.employee
    );
    const result = employee.toJSON();

    if (employee) {
      res.status(201).send({
        data: {
          'first_name': result.first_name,
          'last_name': result.last_name,
        }
      });
    }

  } catch (err) {
    console.log(err);

    res.status(401).json({ status: 'error', message: 'invalid data' });
  }
});



// Login as admin employee or just an employee
router.post('/signin', async function (req, res) {
  try {
    const employee = await EmployeeModel.findOne(
      { email: req.body.email },
      '+password'
    );

    if (!employee)
      return res.status(400).send("Invalid login details.");
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      employee.password
    );
    const result = employee.toJSON();
    delete result.password;

    if (!isPasswordValid)
      return res.status(400).send("Invalid login details.");
    const token = jwt.sign({ id: employee.id }, env.jwt_secret);
    let urlTo;
    if (employee.is_admin === false) {
      urlTo = "dashboard";
    }
    else {
      urlTo = "admin-dashboard";
    }
    res.status(201).json({ status: 'success', data: { token, urlTo, result } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'An error occured' });
  }
});



// Update a employee
router.put('/:email', AuthMiddleware, async function (req, res) {
  try {
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );


    // Check if the employee was found and updated
    if (!updatedEmployee) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry that employee does not exist 😭',
      });
    }

    res.json({
      status: 'success',
      data: updatedEmployee,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while updating the employee 😭',
    });
  }
});

// Delete a employee
router.delete('/:email', AuthMiddleware, async function (req, res) {
  try {
    const deletedEmployee = await EmployeeModel.findOneAndDelete({
      email: req.params.email,
    });

    if (!deletedEmployee) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry you cannot delete a employee that does not exist',
      });
      return;
    }

    res.json({
      status: 'success',
      message: '👋🏿 successfully deleted employee',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'An error occured while deleting the employee',
    });
  }
});

// Get a employee by email
router.get('/:email', AuthMiddleware, async function (req, res) {
  try {
    const employee = await EmployeeModel.findOne({ email: req.params.email });

    // Check if a employee was found
    if (!employee) {
      res.status(404).json({
        status: 'error',
        message: 'The employee was not found',
      });
      return;
    }

    res.json({
      status: 'success',
      data: employee,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while getting the employee 😭',
    });
  }
});

// Get all employees
router.get('', AuthMiddleware, async function (req, res) {
  try {
    const search = req.query.gender ? { gender: req.query.gender } : {};

    const employees = await EmployeeModel.find(search);
    res.json({
      status: 'succcess',
      data: employees,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "An error occured while getting employee's",
    });
  }
});

module.exports = router;
