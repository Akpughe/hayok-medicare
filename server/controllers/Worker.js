const Worker = require('../models/Worker');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

exports.getAllWorkers = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // const users = await User.find().select('-password');
    const users = await Worker.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Sever Error' });
  }
};

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, password, age, gender, cadre, department } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !age ||
    !password ||
    !gender ||
    !cadre ||
    !department
  )
    return res
      .status(400)
      .json({ errors: [{ msg: 'Please fill all fields' }] });

  try {
    let user = await Worker.findOne({
      lastname,
    });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Last name already registered' }] });
    }

    //Encrypt password
    let encryptedPassword;
    const salt = await bcrypt.genSalt(10);

    encryptedPassword = await bcrypt.hash(password, salt);

    user = new Worker({
      firstname,
      lastname,
      age,
      gender,
      cadre,
      department,
      password: encryptedPassword,
    });
    await user.save();
    res.json({ msg: 'Worker added successfully' + ' ' + lastname });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Sever Error' });
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { lastname, password } = req.body;

  try {
    let user = await Worker.findOne({ lastname });

    if (!user)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Last name does not exist' }] });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const token = jwt.sign(
      {
        lastname: user.lastname,
        userId: user._id.toString(),
      },
      config.get('jwtSecret')
    );

    res.status(200).json({
      token: token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        gender: user.gender,
        cadre: user.cadre,
        department: user.department,
        _id: user._id,
      },
      msg: 'Login successful',
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Sever Error' });
  }
};
