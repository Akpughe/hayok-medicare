import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Encounter from '../../components/Encounter';

const PatientDetails = (props) => {
  return (
    <div>
      <div className="flex flex-col flex-grow pl-16 pr-8 pt-20 mb-10 bg-gray-100 h-screen">
        <Link href="/patient"> Back</Link>
        <div className="flex p-9">
          <div className="flex flex-col items-center w-96 h-auto mr-8  bg-white border rounded-3xl ">
            <div className="img h-20 w-20 mb-4 mt-6 rounded-full bg-gray-400"></div>
            <h2 className="font-semibold text-xl">
              {props.patient.firstname} {props.patient.lastname}
            </h2>
            <div className="flex justify-center w-full p-10 ">
              <div className="flex flex-1">
                <div className="main_one flex flex-col">
                  <div className="mb-8">
                    <small>Date of Birth</small>
                    <h3 className="font-semibold">{props.patient.age}</h3>
                  </div>
                  <div className="mb-8">
                    <small>Gender</small>
                    <h3 className="font-semibold">{props.patient.gender}</h3>
                  </div>
                  {/* <div className="mb-8">
                    <small>Height</small>
                    <h3 className="font-semibold">{props.patient.height}</h3>
                  </div>
                  <div className="mb-8">
                    <small>Weight</small>
                    <h3 className="font-semibold">
                      {props.patient.weight}
                    </h3>
                  </div> */}
                </div>
              </div>
              <div className="flex flex-1">
                <div className="main_one flex flex-1 flex-col text-right">
                  <div className="mb-8">
                    <small>Height</small>
                    <h3 className="font-semibold">{props.patient.height}</h3>
                  </div>
                  <div className="mb-8">
                    <small>Weight</small>
                    <h3 className="font-semibold">{props.patient.weight}</h3>
                  </div>
                  {/* <div className="mb-8">
                    <small>E-mail</small>
                    <h3 className="font-semibold">{props.user.email}</h3>
                  </div>
                  <div className="mb-8">
                    <small>Marital Status</small>
                    <h3 className="font-semibold">
                      {props.user.maritalStatus}
                    </h3>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* vitals */}
          <Encounter patientId={props.patient._id} />
        </div>
        {/* <div style={{ marginLeft: '450px', marginTop: '-200px' }}>
          <Diagnosis userId={props.user._id} />
        </div> */}
      </div>
    </div>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { data } = await axios.get(
    'http://localhost:4000/api/patient/get-all-patients'
  );

  //   console.log(data);

  const patients = data;

  // Get the paths we want to pre-render based on posts
  const paths = patients.map((user) => ({
    params: { id: user._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const { data } = await axios.get(
    `http://localhost:4000/api/patient/${params.id}`
  );

  const patient = data;

  // console.log(user)

  // Pass post data to the page via props
  return { props: { patient } };
}

export default PatientDetails;
