import React, { useState } from 'react';
import axios from 'axios';

const Encounter = ({ patientId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    visit: '',
    height: '',
    weight: '',
    bloodPressure: '',
    temperature: '',
    respiratoryRate: '',
    complain: '',
    diagnosis: '',
    treatment: '',
    PatientId: patientId,
  });
  const {
    date,
    time,
    visit,
    height,
    weight,
    bloodPressure,
    temperature,
    respiratoryRate,
    complain,
    diagnosis,
    treatment,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/patient/vitals', {
        // headers: { 'Content-Type': 'application/json' },
        ...formData,
      })
      .then((res) => {
        setIsSubmitting(false);

        // login(res.data, rememberMe);

        console.log('Successful' + res.data);
        alert('Done');
        return router.push(`/patient`);
      })
      .catch((err) => {
        console.log(err);
        if (!err.response) {
          alert('failed registration');
        }

        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col p-10 w-auto h-auto bg-white border rounded-3xl mr-8 ">
      <div className="main_one flex">
        <h2 className="font-bold text-2xl">Vitals</h2>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="main_one flex justify-between">
          <div className="mt-8 mr-4">
            <label className="block">
              <small className="text-gray-700">Date</small>
              <input
                name="date"
                value={date}
                type="date"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-black"
                placeholder=""
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
          <div className="mt-8 mr-4">
            <label className="block">
              <small className="text-gray-700">Time</small>
              <input
                name="time"
                value={time}
                type="time"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-black"
                placeholder=""
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
          <div className="mt-8 mr-4">
            <label className="block">
              <small className="text-gray-700">Visit</small>
              <select
                name="visit"
                className="block w-full border py-1 px-2"
                value={visit}
                onChange={(e) => onChange(e)}
              >
                <option>-</option>
                <option>First Time</option>
                <option>Repeat Visit</option>
              </select>
            </label>
          </div>
          <div className="mt-8">
            <label className="block">
              <small className="text-gray-700">Temperature</small>
              <input
                name="temperature"
                value={temperature}
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-black"
                placeholder=""
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
        </div>
        <div className="main_one flex justify-between">
          <div className="mt-8 mr-4">
            <label className="block">
              <small className="text-gray-700">Weight</small>
              <input
                name="weight"
                value={weight}
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-black"
                placeholder=""
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
          <div className="mt-8 mr-4">
            <label className="block">
              <small className="text-gray-700">Height</small>
              <input
                name="height"
                value={height}
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-black"
                placeholder=""
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
          <div className="mt-8 mr-4">
            <label className="block">
              <small className="text-gray-700">Blood Pressure</small>
              <input
                name="bloodPressure"
                value={bloodPressure}
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-black"
                placeholder=""
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
          <div className="mt-8">
            <label className="block">
              <small className="text-gray-700">Respiratory Rate</small>
              <input
                name="respiratoryRate"
                value={respiratoryRate}
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-black"
                placeholder=""
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
        </div>
        <div className="main_one flex justify-between">
          <div className="mt-8 w-full mr-5">
            <label className="block">
              <small className="text-gray-700">Complain</small>
              <textarea
                name="complain"
                value={complain}
                onChange={(e) => onChange(e)}
                className="mt-1 p-1 block w-full border border-gray-500"
                rows="4"
              ></textarea>
            </label>
          </div>
          <div className="mt-8 w-full">
            <label className="block">
              <small className="text-gray-700">Diagnosis</small>
              <textarea
                name="diagnosis"
                value={diagnosis}
                onChange={(e) => onChange(e)}
                className="mt-1 p-1 block w-full border border-gray-500"
                rows="4"
              ></textarea>
            </label>
          </div>
        </div>
        {/* treatmenr */}
        <div className="main_one flex justify-between">
          <div className="mt-8 w-full">
            <label className="block">
              <small className="text-gray-700">Treatment</small>
              <textarea
                name="treatment"
                value={treatment}
                onChange={(e) => onChange(e)}
                className="mt-1 p-1 block w-full border border-gray-500"
                rows="4"
              ></textarea>
            </label>
          </div>
        </div>
        <div className="flex justify-">
          <button
            type="submit"
            className="p-3 px-8 mt-6 bg-blue-500 text-white uppercase rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            record
          </button>
        </div>
      </form>
    </div>
  );
};

export default Encounter;
