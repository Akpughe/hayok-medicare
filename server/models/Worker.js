var mongoose = require('mongoose');

var WorkerSchema = new mongoose.Schema(
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
    cadre: {
      type: String,
      enum: ['Doctor'],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
      enum: ['Medicine'],
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

module.exports = mongoose.model('Worker', WorkerSchema);
