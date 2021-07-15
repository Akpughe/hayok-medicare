const express = require('express');
const { check, body } = require('express-validator');

const patientController = require('../controllers/Patient');

const isAuth = require('../middleware/auth');

const router = express.Router();

router.get('/get-all-patients', patientController.getAllPatients);

router.post(
  '/register',
  [
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 5 or more characters'
    ).isLength({ min: 5 }),
    check('age', 'Age is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('height', 'Height is required').not().isEmpty(),
    check('weight', 'Weight is required').not().isEmpty(),
    check('ward', 'Ward is required').not().isEmpty(),
    check('lga', 'LGA is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
  ],
  patientController.register
);

router.post(
  '/login',
  [
    check('lastname', 'Please enter your Lastname').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 5 or more characters'
    ).isLength({ min: 5 }),
  ],
  patientController.login
);

router.post(
  '/vitals',
  [
    check('date', 'Date is required').not().isEmpty(),
    check('time', 'Time is required').not().isEmpty(),
    check('visit', 'Visit is required').not().isEmpty(),
    check('bloodPressure', 'Blood Pressure is required').not().isEmpty(),
    check('temperature', 'Temperature is required').not().isEmpty(),
    check('respiratoryRate', 'Respiratory Rate is required').not().isEmpty(),
    check('complain', 'Complain is required').not().isEmpty(),
    check('diagnosis', 'Diagnosis is required').not().isEmpty(),
    check('treatment', 'Treatment is required').not().isEmpty(),
  ],
  isAuth,
  patientController.vitals
);

module.exports = router;
