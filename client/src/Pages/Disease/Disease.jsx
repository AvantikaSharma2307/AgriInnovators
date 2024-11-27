import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const DiseasePredictionPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview image
    }
  };

  // Validation schema for Formik
  const validationSchema = Yup.object({
    image: Yup.mixed().required('Image is required'),
  });

  // Handle form submission (image upload + prediction request)
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('file', image); // Append image to form data

    try {
      // Replace with your actual API endpoint for disease prediction
      const response = await axios.post('/api/disease-prediction', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the response contains a 'prediction' field
      setPredictionResult(response.data.prediction);
      setSubmitting(false);
    } catch (error) {
      console.error('Error during prediction:', error);
      setSubmitting(false);
    }
  };

  return (
    <div className='bg-lime-200 h-full'>
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-center mb-6 mt-56">Disease Prediction</h1>
      <Formik
        initialValues={{
          image: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="image" className="block text-lg font-medium text-gray-700">
                Upload an image for disease prediction
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="w-full p-3 mt-2 border border-gray-900 border-2 rounded-md"
                onChange={(event) => {
                  setFieldValue('image', event.target.files[0]);
                  handleImageChange(event);
                }}
              />
              {touched.image && errors.image && (
                <div className="text-red-500 text-sm">{errors.image}</div>
              )}
            </div>

            {preview && (
              <div className="mt-4">
                <h3 className="text-lg font-medium">Image Preview</h3>
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 max-w-full h-auto rounded-md"
                />
              </div>
            )}

            <div className="text-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-300"
              >
                {isSubmitting ? 'Predicting...' : 'Submit for Prediction'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Display prediction result */}
      {predictionResult && (
        <div className="mt-6 p-4 bg-green-100 text-center rounded-md">
          <h2 className="text-xl font-semibold">Prediction Result</h2>
          <p className="text-lg">{predictionResult}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default DiseasePredictionPage;
