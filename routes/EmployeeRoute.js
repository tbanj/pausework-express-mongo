const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeModel = require('../models/EmployeeModel');
const AuthMiddleware = require('../middlewares/auth');
const adminKey = 'LevelUp'
const env = require('../env');

const router = express.Router();

// Sign up a employee
router.post('/', async function(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log('hello');
    
    const employee = await EmployeeModel.create(req.body);
    console.log(employee)
    console.log(env.jwt_secret);
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

// admin signup
router.post('/', AuthMiddleware,async function(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log('hello');
    
    const employee = await EmployeeModel.create(req.body);
    console.log(employee)
    console.log(env.jwt_secret);
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
router.get('/profile', AuthMiddleware, async function(req, res) {
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

// Login a employee
router.post('/signin', async function(req, res) {
  try {
    const employee = await EmployeeModel.findOne(
      { email: req.body.email },
      '+password'
    );

    if (!employee)
      return res
        .status(401)
        .json({ status: 'error', message: 'Invalid login details' });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      employee.password
    );
    
    const result = employee.toJSON();
    
    delete result.password;

    if (!isPasswordValid)
      return res
        .status(401)
        .json({ status: 'error', message: 'Invalid login details' });

    const token = jwt.sign({ id: employee.id }, env.jwt_secret);
    res.json({ status: 'success', data: { token, result } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'An error occured' });
  }
});

// Update a employee
router.put('/:email', AuthMiddleware, async function(req, res) {
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
router.delete('/:email', AuthMiddleware, async function(req, res) {
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
router.get('/:email', AuthMiddleware,async function(req, res) {
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
router.get('', AuthMiddleware, async function(req, res) {
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
