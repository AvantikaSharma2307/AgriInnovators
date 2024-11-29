import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation Schema using Yup
const validationSchema = Yup.object({
  Temperature: Yup.number().required('Temperature is required').min(0).max(80),
  Humidity: Yup.number().required('Humidity is required').min(0).max(100),
  Moisture: Yup.number().required('Moisture is required').min(0).max(100),
  pH: Yup.number().required('pH is required').min(0).max(14),
  Rainfall: Yup.number().required('Rainfall is required').min(0).max(100),
  Nitrogen: Yup.number().required('Nitrogen level is required').min(0).max(100),
  Potassium: Yup.number().required('Potassium level is required').min(0).max(100),
  Phosphorous: Yup.number().required('Phosphorus level is required').min(0).max(100),
});

const CropRecommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [espData, setEspData] = useState(null); // State to store ESP data

  // Fetch data from backend (which gets it from ESP8266)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getsensor_data'); // Fetching data from backend
        setEspData(response.data); // Store the fetched data
      } catch (err) {
        setError('Error fetching data from the backend');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Function to make API call with headers
  const getCropRecommendation = async (data) => {
    try {
      setError(null);

      // Sending POST request with headers and ESP data
      const apiUrl = 'http://localhost:5000/predict_crop'; // Replace with actual API URL

      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response && response.data) {
        setRecommendation(response.data.prediction);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("Error:", err);
      setError('Error fetching recommendation. Please try again.');
    }
  };

  return (
    <div className="h-full bg-lime-200 flex items-center justify-center">
      <div className="w-full p-8 shadow-xl rounded-lg mt-24">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Crop Recommendation</h2>

        {/* Ensure Formik initializes with fetched ESP data */}
        {espData ? (
          <Formik
            initialValues={{
              Temperature: espData.Temperature || '',
              Humidity: espData.Humidity || '',
              Moisture: espData.Moisture || '',
              pH: espData.pH || '',
              Rainfall: espData.Rainfall || '',
              Nitrogen: espData.Nitrogen || '',
              Potassium: espData.Potassium || '',
              Phosphorous: espData.Phosphorous || '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await getCropRecommendation(values);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6 grid grid-cols-2 gap-10">
                {/* Form fields */}
                <div className="mt-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700">Temperature (°C)</label>
                    <Field
                      type="number"
                      name="Temperature"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                    {touched.Temperature && errors.Temperature && (
                      <div className="text-red-500 text-sm">{errors.Temperature}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700">Humidity (%)</label>
                    <Field
                      type="number"
                      name="Humidity"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                    {touched.Humidity && errors.Humidity && (
                      <div className="text-red-500 text-sm">{errors.Humidity}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700">Moisture (%)</label>
                    <Field
                      type="number"
                      name="Moisture"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                    {touched.Moisture && errors.Moisture && (
                      <div className="text-red-500 text-sm">{errors.Moisture}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700">pH Level</label>
                    <Field
                      type="number"
                      name="pH"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                    {touched.pH && errors.pH && (
                      <div className="text-red-500 text-sm">{errors.pH}</div>
                    )}
                  </div>
                </div>

                <div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700">Rainfall (mm)</label>
                    <Field
                      type="number"
                      name="Rainfall"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                    {touched.Rainfall && errors.Rainfall && (
                      <div className="text-red-500 text-sm">{errors.Rainfall}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700">Nitrogen (%)</label>
                    <Field
                      type="number"
                      name="Nitrogen"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                    {touched.Nitrogen && errors.Nitrogen && (
                      <div className="text-red-500 text-sm">{errors.Nitrogen}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700">Potassium (%)</label>
                    <Field
                      type="number"
                      name="Potassium"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                    {touched.Potassium && errors.Potassium && (
                      <div className="text-red-500 text-sm">{errors.Potassium}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700">Phosphorus (%)</label>
                    <Field
                      type="number"
                      name="Phosphorous"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    />
                    {touched.Phosphorous && errors.Phosphorous && (
                      <div className="text-red-500 text-sm">{errors.Phosphorous}</div>
                    )}
                  </div>
                </div>

                <div className="text-center mt-6 col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Crop Recommendation'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Loading sensor data...</p>
        )}

        {recommendation && (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold">Recommended Crop that is best suitable for your field is </h3>
            <p className='text-3xl'>{recommendation}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 text-center text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
