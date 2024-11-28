from flask import Flask, request, jsonify
import os
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "Hello this is api end point"
    }
    return jsonify(data)

# Load the crop recommendation model during app initialization
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Directory of the current script
MODEL_PATH = r'C:/Users/avant/Downloads/Innotech/AgriInnovators/server/crop_rec.pkl'

try:
    with open(MODEL_PATH, 'rb') as file:
        model = pickle.load(file)
    print("Crop recommendation model loaded successfully.")
except Exception as e:
    print(f"Error loading the crop recommendation model: {str(e)}")
    model = None

# Crop mapping dictionary
CROP_MAPPING = {
    5: "Coffee",
    20: "Rice",
    11: "Maize",
    3: "Chickpea",
    9: "Kidneybeans",
    18: "Pigeonpeas",
    13: "Mothbeans",
    14: "Mungbean",
    2: "Blackgram",
    10: "Lentil",
    19: "Pomengranate",
    1: "Banana",
    12: "Mango",
    7: "Grapes",
    21: "Watermelon",
    0: "Apple",
    16: "Orange",
    17: "Papaya",
    4: "Coconut",
    6: "Cotton",
    8: "Jute"
}

@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    if not model:
        return jsonify({'error': 'Model not loaded. Please check the server logs.'}), 500

    try:
        # Parse JSON data from the frontend
        data = request.json

        # Extract required features from the request
        required_features = ['Nitrogen', 'Phosphorous', 'Temperature', 'Humidity', 'pH', 'Rainfall', 'Potassium']
        input_data = []

        for feature in required_features:
            if feature not in data:
                return jsonify({'error': f'Missing key: {feature}'}), 400

            value = data[feature]

            # Check if the value is a valid number (either integer or float)
            if isinstance(value, (int, float)):  # If it's already a number, we don't need to call .replace()
                input_data.append(float(value))
            elif isinstance(value, str):  # If it's a string, check if it's a valid number
                value = value.strip()  # Remove any leading/trailing whitespace
                if value == '' or not value.replace('.', '', 1).isdigit():
                    return jsonify({'error': f'Invalid value for {feature}: "{value}"'}), 400
                input_data.append(float(value))
            else:
                return jsonify({'error': f'Invalid type for {feature}: {type(value)}'}), 400

        # Convert the input data into a numpy array
        input_array = np.array(input_data).reshape(1, -1)

        # Make a prediction
        prediction = model.predict(input_array)

        # Map the predicted value to a crop
        predicted_crop = CROP_MAPPING.get(prediction[0], "Can't Determine")

        # Return the prediction as a JSON response
        return jsonify({'prediction': predicted_crop}), 200

    except Exception as e:
        return jsonify({'error': f"Error during prediction: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)




if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)



