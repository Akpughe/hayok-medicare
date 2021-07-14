var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['M', 'F'],
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    lga: {
      type: String,
      required: true,
      enum: ['Single', 'Divorced', 'Married'],
    },
    state: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    // appointment: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Appointment',
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', PatientSchema);
