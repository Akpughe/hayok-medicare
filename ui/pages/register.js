import React, { useState } from 'react';
import { AuthContext } from '../utils/authContext';
import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { useRouter } from 'next/router';

const register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    age: '',
    password: '',
    gender: '',
    height: '',
    weight: '',
    ward: '',
    lga: '',
    state: '',
    picture: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    firstname,
    lastname,
    age,
    password,
    gender,
    height,
    weight,
    ward,
    lga,
    state,
    picture
  } = formData;

  const router = useRouter()

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:4000/api/patient/register', {
        // headers: { 'Content-Type': 'application/json' },
        ...formData
      })
      .then((res) => {
        setIsSubmitting(false);

        // login(res.data, rememberMe);

        console.log('Successful' + res.data);
        alert('Done')
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
    <MainLayout>
      <div className="flex flex-col flex-grow pl-80 pt-20 mb-10 bg-gray-100 h-full">
        <h1 className="text-5xl">register patient</h1>

        <form onSubmit={(e)=> handleSubmit(e)}>
          <div className="max-w-xl mx-auto md:max-w-4xl">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* 1 */}
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Firstname</span>
                  <input
                    name="firstname"
                    type="text"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="John"
                    value={firstname}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Date of Birth</span>
                  <input
                    name="age"
                    type="date"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="patient1234"
                    value={age}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Height</span>
                  <input
                    name="height"
                    type="text"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="170cm"
                    value={height}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Weight</span>
                  <input
                    name="weight"
                    type="text"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="70kg"
                    value={weight}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">State</span>
                  <input
                    name="state"
                    type="text"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="Lagos"
                    value={state}
                    onChange={(e) => onChange(e)}
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Picture</span>
                  <input
                    name="picture"
                    value={picture}
                    className="form-input mt-1 block w-full py-4 px-2"
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => onChange(e)}
                  />
                </label>
              </div>
              {/* 2 */}
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Lastname</span>
                  <input
                    name="lastname"
                    type="text"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="Doe"
                    value={lastname}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Password</span>
                  <input
                    name="password"
                    type="password"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="********"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Gender</span>
                  <select
                    name="gender"
                    className="block w-full mt-1 py-4 px-2"
                    value={gender}
                    onChange={(e) => onChange(e)}
                  >
                    <option>-</option>
                    <option>M</option>
                    <option>F</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-gray-700">BMI</span>
                  <input
                    name="bmi"
                    type="text"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="0.03234"
                    // value={email}
                    // onChange={(e) => onChange(e)}
                    disabled
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Ward</span>
                  <input
                    name="ward"
                    type="text"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="ward"
                    value={ward}
                    onChange={(e) => onChange(e)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">LGA</span>
                  <input
                    name="lga"
                    type="text"
                    className="form-input mt-1 block w-full py-4 px-2"
                    placeholder="lga"
                    value={lga}
                    onChange={(e) => onChange(e)}
                  />
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-indigo-500 py-4 px-8 rounded text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default register;
