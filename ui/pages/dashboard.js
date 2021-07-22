import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../utils/authContext';
import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

const dashboard = () => {
  const { user } = useContext(AuthContext);
  const [patient, setPatient] = useState([]);
  const getPatients = async () => {
    const res = await axios.get(
      'http://localhost:4000/api/patient/get-all-patients'
    );

    return res.data;
  };

  useEffect(async () => {
    const patientRes = await getPatients();
    setPatient(patientRes);
    // console.log(patientRes);
  }, []);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const M = patient.filter(function (e) {
    return e.gender === 'M';
  });
  const F = patient.filter(function (e) {
    return e.gender === 'F';
  });
  const below20 = patient.filter(function (e) {
    return getAge(e.age) < 20;
  });
  const above20to40 = patient.filter(function (e) {
    return getAge(e.age) > 20 && getAge(e.age) <= 40;
  });
  const above40to60 = patient.filter(function (e) {
    return getAge(e.age) > 40 && getAge(e.age) <= 60;
  });
  const above60to80 = patient.filter(function (e) {
    return getAge(e.age) > 60 && getAge(e.age) <= 80;
  });
  const above80 = patient.filter(function (e) {
    return getAge(e.age) > 80;
  });
  

  const mlength = M.length;
  const flength = F.length;

  const data_gender = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: '# of Votes',
        data: [mlength, flength],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels: ['0-20', '20-40', '40-60', '60-80', '80 and above'],
    datasets: [
      {
        label: '# of Votes',
        data: [below20.length, above20to40.length, above40to60.length, above60to80.length, above80.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <MainLayout>
      <div className="flex flex-col flex-grow pl-80 pt-20 mb-10 bg-gray-100 h-full">
        <h1 className="text-5xl mb-6">dashboard</h1>
        <div className="flex  justify-evenly">
          <div className="flex p-4 border">
            <Doughnut data={data_gender} />
          </div>
          <div className="flex p-4 border">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default dashboard;
