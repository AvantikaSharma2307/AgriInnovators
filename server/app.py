from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from PIL import Image
import pickle
import numpy as np
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "Hello this is api end point"
    }
    return jsonify(data)

# Load the crop recommendation model 
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  
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
    

UPLOAD_FOLDER = r'C:/Users/avant/Downloads/Innotech/AgriInnovators/server/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions for image
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Function to check allowed file extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Load models (replace these with your actual model loading code)
def load_model(model_name):
    if model_name == 'tomato':
        with open(r'C:/Users/avant/Downloads/Innotech/AgriInnovators/server/tomato.pkl', 'rb') as file:
            model = pickle.load(file)
        return model
    elif model_name == 'corn':
        with open(r'C:/Users/avant/Downloads/Innotech/AgriInnovators/server/corn_dis.pkl', 'rb') as file:
            model = pickle.load(file)
        return model
    else:
        raise ValueError(f"Model for '{model_name}' not found")

# Route for handling image upload and prediction
@app.route('/api/disease-prediction', methods=['POST'])
def predict_disease():
    if 'file' not in request.files or 'text' not in request.form:
        return jsonify({'error': 'No file or text input provided'}), 400

    file = request.files['file']
    model_name = request.form['text'].lower()  # Text value to determine which model to load
    
    # Check if the file is valid
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Open the image and preprocess it as required by the model
        img = Image.open(file_path)
        img = img.resize((120, 120))  # Resize to 120x120 as required by your model
        img_array = np.array(img) / 255.0  # Normalize if needed

        # Ensure the image has 3 channels (RGB)
        if img_array.ndim == 2:  # Grayscale image, add channels
            img_array = np.stack([img_array] * 3, axis=-1)
        
        # Add batch dimension (expand dims to make it compatible with the model input)
        img_array = np.expand_dims(img_array, axis=0)

        # Load the appropriate model based on the text input
        model = load_model(model_name)

        # Get the prediction from the model
        prediction = model.predict(img_array)
        print(f"Prediction array: {prediction}")

        # For multi-class classification (e.g., 3 classes)
        if prediction.ndim == 2:  # Shape (1, num_classes)
            predicted_class = np.argmax(prediction, axis=-1)
            print(f"Predicted class index: {predicted_class}")

            # Map to disease names (ensure this list matches the number of classes in your model)
            disease_names = ['Healthy', 'Diseased', 'Unknown']
            if predicted_class[0] < len(disease_names):
                predicted_disease = disease_names[predicted_class[0]]
            else:
                predicted_disease = "Unknown Disease"
        
        # For binary classification (e.g., 0 = Healthy, 1 = Diseased)
        elif prediction.ndim == 1 and prediction.shape[1] == 1:  # Shape (1,)
            predicted_disease = 'Diseased' if prediction[0] > 0.5 else 'Healthy'

        print(f"Predicted disease: {predicted_disease}")

        return jsonify({'prediction': predicted_disease}), 200

    return jsonify({'error': 'Invalid file format'}), 400



if __name__ == '__main__':
    app.run(debug=True)




if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)



