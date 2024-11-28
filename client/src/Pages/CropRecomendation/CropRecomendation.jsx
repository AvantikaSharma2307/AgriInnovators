import React, { useState } from 'react';
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

  // Function to make API call with headers
  const getCropRecommendation = async (values) => {
    try {
      setError(null);
  
      // Convert all form values to numbers (either integers or floats where necessary)
      const parsedValues = {
        Temperature: parseFloat(values.Temperature),
        Humidity: parseFloat(values.Humidity),
        Moisture: parseFloat(values.Moisture),
        pH: parseFloat(values.pH),
        Rainfall: parseFloat(values.Rainfall),
        Nitrogen: parseFloat(values.Nitrogen),
        Potassium: parseFloat(values.Potassium),
        Phosphorous: parseFloat(values.Phosphorous),
      };
  
      // Flask server URL (adjust as needed)
      const apiUrl = 'http://localhost:5000/predict_crop';
  
      // Sending POST request with headers and data
      const response = await axios.post(
        apiUrl,
        parsedValues,
        {
          headers: {
            'Content-Type': 'application/json', // Set header for JSON data
            'Accept': 'application/json', // Expect JSON response
          },
        }
      );
  
      // Check if the response is as expected
      if (response && response.data) {
        setRecommendation(response.data.prediction);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      // Log the complete error object for debugging purposes
      console.error("Error:", err);
      console.error("Error details:", err.response ? err.response.data : err.message);
  
      // Show a generic error message
      setError('Error fetching recommendation. Please try again.');
    }
  };
  
  return (
    <div className="h-full bg-lime-200 flex items-center justify-center">
      <div className="w-full p-8 shadow-xl rounded-lg mt-24">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Crop Recommendation</h2>

        <Formik
          initialValues={{
            Temperature: '',
            Humidity: '',
            Moisture: '',
            pH: '',
            Rainfall: '',
            Nitrogen: '',
            Potassium: '',
            Phosphorous: '',
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
                  <label className="block text-lg font-medium text-gray-700">Phosphorous (%)</label>
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
                  {isSubmitting ? 'Submitting...' : 'Get Recommendation'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Display recommendation */}
        <div className="mt-8">
          {recommendation && (
            <div className="text-xl text-green-700 font-bold">
              Recommended Crop that is best suitable for your farm is: <span className='text-3xl '>{recommendation}</span>
            </div>
          )}
          {error && (
            <div className="text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
