import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Crop recommendation function (you can replace this with your logic or API call)
const recommendCrop = (values) => {
  // Placeholder logic for crop recommendation
  if (values.temperature > 25 && values.humidity < 70) {
    return 'Wheat';
  } else if (values.temperature < 25 && values.humidity > 80) {
    return 'Rice';
  }
  return 'Corn';
};

// Validation Schema using Yup
const validationSchema = Yup.object({
  temperature: Yup.number().required('Temperature is required').min(0).max(50),
  humidity: Yup.number().required('Humidity is required').min(0).max(100),
  moisture: Yup.number().required('Moisture is required').min(0).max(100),
  pH: Yup.number().required('pH is required').min(0).max(14),
  rainfall: Yup.number().required('Rainfall is required').min(0).max(100),
  nitrogen: Yup.number().required('Nitrogen level is required').min(0).max(100),
  potassium: Yup.number().required('Potassium level is required').min(0).max(100),
  phosphorus: Yup.number().required('Phosphorus level is required').min(0).max(100),
});

const CropRecommendation = () => {
  return (
    <div className="h-full bg-lime-200 flex items-center justify-center">
      <div className="w-full p-8 shadow-xl rounded-lg mt-24">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Crop Recommendation</h2>

        <Formik
  initialValues={{
    temperature: '',
    humidity: '',
    moisture: '',
    pH: '',
    rainfall: '',
    nitrogen: '',
    potassium: '',
    phosphorus: '',
  }}
  validationSchema={validationSchema}
  onSubmit={(values, { setSubmitting, resetForm }) => {
    const crop = recommendCrop(values);
    setSubmitting(false);
    alert(`Recommended Crop: ${crop}`);
    resetForm();
  }}
>
  {({ isSubmitting, errors, touched }) => (
    <Form className="space-y-6 grid grid-cols-2 gap-10">
      {/* Left Column (Temperature, Humidity, Moisture, pH) */}
      <div className='mt-6'>
        <div>
          <label className="block text-lg font-medium text-gray-700">Temperature (°C)</label>
          <Field
            type="number"
            name="temperature"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
          {touched.temperature && errors.temperature && (
            <div className="text-red-500 text-sm">{errors.temperature}</div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Humidity (%)</label>
          <Field
            type="number"
            name="humidity"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
          {touched.humidity && errors.humidity && (
            <div className="text-red-500 text-sm">{errors.humidity}</div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Moisture (%)</label>
          <Field
            type="number"
            name="moisture"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
          {touched.moisture && errors.moisture && (
            <div className="text-red-500 text-sm">{errors.moisture}</div>
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

      {/* Right Column (Rainfall, Nitrogen, Potassium, Phosphorus) */}
      <div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Rainfall (mm)</label>
          <Field
            type="number"
            name="rainfall"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
          {touched.rainfall && errors.rainfall && (
            <div className="text-red-500 text-sm">{errors.rainfall}</div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Nitrogen (%)</label>
          <Field
            type="number"
            name="nitrogen"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
          {touched.nitrogen && errors.nitrogen && (
            <div className="text-red-500 text-sm">{errors.nitrogen}</div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Potassium (%)</label>
          <Field
            type="number"
            name="potassium"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
          {touched.potassium && errors.potassium && (
            <div className="text-red-500 text-sm">{errors.potassium}</div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Phosphorus (%)</label>
          <Field
            type="number"
            name="phosphorus"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
          {touched.phosphorus && errors.phosphorus && (
            <div className="text-red-500 text-sm">{errors.phosphorus}</div>
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

      </div>
    </div>
  );
};

export default CropRecommendation;
