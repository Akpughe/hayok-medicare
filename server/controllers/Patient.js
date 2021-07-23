const Patient = require('../models/Patient');
const Worker = require('../models/Worker');
const Encounter = require('../models/Encounter');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

exports.getPatientById = async (req, res, next) => {
  const userId = req.patientId;
  try {
    const user = await Patient.findById(userId)
      .select('-password')
      .populate('encounter', [
        'date',
        'time',
        'weight',
        'height',
        'bloodPressure',
        'bmi',
        'respiratoryRate',
        'temperature',
        'diagnosis',
        'treatment',
      ]);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPatientsById = async (req, res, next) => {
  const patientId = req.patientId;
  try {
    const puser = await Patient.findById(req.params.patientId).select(
      '-password'
    );
    res.json(puser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstname,
    lastname,
    password,
    age,
    gender,
    height,
    weight,
    bmi,
    ward,
    lga,
    state,
    picture,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !age ||
    !password ||
    !gender ||
    !height ||
    !weight ||
    // !bmi ||
    !ward ||
    !lga ||
    !state
    // !picture
  )
    return res
      .status(400)
      .json({ errors: [{ msg: 'Please fill all fields' }] });

  let newbmi = weight / (height * height);

  try {
    let user = await Patient.findOne({
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

    user = new Patient({
      firstname,
      lastname,
      password: encryptedPassword,
      age,
      gender,
      height,
      weight,
      bmi: newbmi,
      ward,
      lga,
      state,
      picture,
    });
    await user.save();
    res.json({ msg: 'Patient added successfully' + ' ' + lastname });
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
    let user = await Patient.findOne({ lastname });

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
        patientId: user._id.toString(),
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
        height: user.height,
        weight: user.weight,
        bmi: user.bmi,
        ward: user.ward,
        lga: user.lga,
        state: user.ward,
        _id: user._id,
      },
      msg: 'Login successful',
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Sever Error' });
  }
};

exports.vitals = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    date,
    time,
    visit,
    respiratoryRate,
    complain,
    diagnosis,
    treatment,
    temperature,
    bloodPressure,
    weight,
    height,
    patientId,
  } = req.body;

  if (
    !temperature ||
    !bloodPressure ||
    !weight ||
    !height ||
    !date ||
    !time ||
    !visit ||
    !respiratoryRate ||
    !complain ||
    !diagnosis ||
    !treatment ||
    !patientId
  )
    return res
      .status(400)
      .json({ errors: [{ msg: 'Please fill all fields' }] });

  const newbmi = weight / Math.pow(height, 2);

  const userIdx = req.userId;

  try {
    const user = await Worker.findById(userIdx);

    if (!user)
      return res.status(404).json({ errors: [{ msg: 'account not found' }] });

    const patient = await Patient.findById(patientId);

    const encounter = new Encounter({
      date,
      time,
      visit,
      respiratoryRate,
      complain,
      diagnosis,
      treatment,
      temperature,
      bloodPressure,
      weight,
      height,
      bmi: newbmi,
      patientId,
    });

    patient.encounter.push(encounter._id);

    await encounter.save();
    await patient.save();

    res.status(201).json(encounter);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Sever Error' });
  }
};
