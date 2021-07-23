import React, { useState, useEffect, useContext } from 'react';
import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { AuthContext } from '../utils/authContext';
import { Table } from 'antd';
const home = () => {
  const { user } = useContext(AuthContext);

  const token = user.token;
  const [patient, setPatient] = useState([]);
  const getPatient = async () => {
    const res = await axios.get('http://localhost:4000/api/patient/', {
      headers: {
        'x-auth-token': `${token}`,
      },
    });

    return res.data;
  };

  useEffect(async () => {
    const patientRes = await getPatient();
    setPatient(patientRes);
    // console.log(patientRes);
  }, []);

  const enc = patient.encounter;
  console.log(enc);
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'BP',
      dataIndex: 'bloodPressure',
      key: 'bloodPressure',
    },
    {
      title: 'Respiratory Rate',
      dataIndex: 'respiratoryRate',
      key: 'respiratoryRate',
    },
    {
      title: 'Tempearature',
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      title: 'Diagnosis',
      dataIndex: 'treatment',
      key: 'treatment',
    },
    {
      title: 'Treatment',
      dataIndex: 'treatment',
      key: 'treatment',
    },
    // {
    //   title: 'Created At',
    //   dataIndex: 'createdAt',
    //   key: 'createdAt',
    // },
  ];
  return (
    <MainLayout>
      <div className="flex flex-col flex-grow pl-80 pr-10 pt-20 mb-10 bg-gray-100 h-full">
        <h1 className="text-5xl mb-6">dashboard</h1>
        <div>
        <Table columns={columns} dataSource={enc} className="w-full" />

        </div>
      </div>
    </MainLayout>
  );
};

export default home;
