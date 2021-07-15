const express = require('express');
const { check, body } = require('express-validator');

const workerController = require('../controllers/Worker');

// const isAuth = require('../middleware/auth');

const router = express.Router();

router.get('/get-all-workers', workerController.getAllWorkers);


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
    check('cadre', 'Cadre is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty(),
  ],
  workerController.register
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
    workerController.login
  );

module.exports = router;
