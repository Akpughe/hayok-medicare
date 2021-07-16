const Patient = require('../models/Patient');
const Worker = require('../models/Worker');
const Encounter = require('../models/Encounter');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPatientById = async (req, res, next) => {
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
    let patient = await Patient.findOne({
      lastname,
    });

    if (patient) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Last name already registered' }] });
    }

    //Encrypt password
    let encryptedPassword;
    const salt = await bcrypt.genSalt(10);

    encryptedPassword = await bcrypt.hash(password, salt);

    patient = new Patient({
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
    await patient.save();
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
    let patient = await Patient.findOne({ lastname });

    if (!patient)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Last name does not exist' }] });

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const token = jwt.sign(
      {
        lastname: patient.lastname,
        patientId: patient._id.toString(),
      },
      config.get('jwtSecret')
    );

    res.status(200).json({
      token: token,
      patient: {
        firstname: patient.firstname,
        lastname: patient.lastname,
        age: patient.age,
        gender: patient.gender,
        height: patient.height,
        weight: patient.weight,
        bmi: patient.bmi,
        ward: patient.ward,
        lga: patient.lga,
        state: patient.ward,
        _id: patient._id,
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
