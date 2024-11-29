import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation Schema using Yup
const validationSchema = Yup.object({
  Temperature: Yup.number().required('Temperature is required').min(0).max(80),
  Humidity: Yup.number().required('Humidity is required').min(0).max(100),
  Moisture: Yup.number().required('Moisture is required').min(0).max(100),
  Soil_Type: Yup.string().required('Soil Type is required'),
  Crop_Type: Yup.string().required('Crop Type is required'),
  Nitrogen: Yup.number().required('Nitrogen level is required').min(0).max(100),
  Potassium: Yup.number().required('Potassium level is required').min(0).max(100),
  Phosphorus: Yup.number().required('Phosphorus level is required').min(0).max(100),
});

const FertilizerPrediction = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  // Function to make API call with headers
  const getFertilizerRecommendation = async (values) => {
    try {
      setError(null);

      // Convert all form values to numbers (either integers or floats where necessary) and keep string fields as is
      const parsedValues = {
        Temperature: parseFloat(values.Temperature),
        Humidity: parseFloat(values.Humidity),
        Moisture: parseFloat(values.Moisture),
        SoilType: values.Soil_Type, // Match the field names here
        CropType: values.Crop_Type, // Match the field names here
        Nitrogen: parseFloat(values.Nitrogen),
        Potassium: parseFloat(values.Potassium),
        Phosphorus: parseFloat(values.Phosphorus),
      };

      // Flask server URL (adjust as needed)
      const apiUrl = 'http://localhost:5000/api/predict-fertilizer';

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
        setRecommendation(response.data.predictedFertilizer); // Adjust the field name here
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
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Fertilizer Prediction</h2>

        <Formik
          initialValues={{
            Temperature: '',
            Humidity: '',
            Moisture: '',
            Soil_Type: '',  
            Crop_Type: '',
            Nitrogen: '',
            Potassium: '',
            Phosphorus: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await getFertilizerRecommendation(values);
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
                  <label className="block text-lg font-medium text-gray-700">Soil Type</label>
                  <Field
                    as="select"
                    name="Soil_Type"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Soil Type</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Clay">Clay</option>
                  </Field>
                  {touched.Soil_Type && errors.Soil_Type && (
                    <div className="text-red-500 text-sm">{errors.Soil_Type}</div>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Crop Type</label>
                  <Field
                    as="select"
                    name="Crop_Type"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Crop Type</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Corn">Corn</option>
                  </Field>
                  {touched.Crop_Type && errors.Crop_Type && (
                    <div className="text-red-500 text-sm">{errors.Crop_Type}</div>
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
                    name="Phosphorus"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  />
                  {touched.Phosphorus && errors.Phosphorus && (
                    <div className="text-red-500 text-sm">{errors.Phosphorus}</div>
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

        {recommendation && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold">Recommended Fertilizer:</h3>
            <p className="text-lg text-green-600">{recommendation}</p>
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

export default FertilizerPrediction;
