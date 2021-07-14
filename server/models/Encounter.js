var mongoose = require('mongoose');

var PatientVitalsSchema = new mongoose.Schema({
  // patient: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Patient',
  // },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  bloodPressure: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  bodyMass: {
    type: Number,
    required: true,
  },
},
    {timestamps:true}
);

module.exports = mongoose.model('PatientVitals', PatientVitalsSchema);
