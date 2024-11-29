from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from PIL import Image
import pickle
import numpy as np
import tensorflow as tf
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder
import joblib

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


model_to = joblib.load(r"C:/Users/avant\Downloads/Innotech\AgriInnovators\server/tomato.pkl")



# Load models (replace these with your actual model loading code)
# def load_model(model_name):
#     print(model_name)
#     try:
#         if model_name == 'tomato':
#             with open(r'C:/Users/avant/Downloads/Innotech/AgriInnovators/server/tomato.pkl', 'rb') as file:
#                 model = joblib.load(file)
#             print("Tomato model loaded successfully")
#             return model
#         elif model_name == 'corn':
#             with open(r'C:/Users/avant/Downloads/Innotech/AgriInnovators/server/corn_dis.pkl', 'rb') as file:
#                 model = joblib.load(file)
#             print("Corn model loaded successfully")
#             return model
#         else:
#             raise ValueError(f"Model for '{model_name}' not found")
#     except Exception as e:
#         print(f"Error loading model {model_name}: {e}")
#         return None

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
        # model = load_model(model_name)
        

        # Confirm the shape of the input
        print(f"Input shape to the model: {img_array.shape}")

        # Get the prediction
        prediction = model_to.predict(img_array)
        print(f"Prediction array: {prediction}")
        

        # # Get the prediction from the model
        # prediction = model.predict(img_array)
        # print(f"Prediction array: {prediction}")

        # For multi-class classification (e.g., 3+ classes)
        if prediction.ndim == 2:  # Shape (1, num_classes)
            predicted_class = np.argmax(prediction, axis=-1)[0]
            print(f"Predicted class index: {predicted_class}")

            # Define crop-specific mappings
            tomato_disease_mapping = {
                0: "Bacterial Spot",
                1: "Early Blight",
                2: "Healthy",
                3:"Late Blight",
                4: "Leaf Mold",
                5:"Powdeny mildew",
                6: "Septoria Leaf Spot",
                7: "Spider mites.Two spotted spider",
                8:"Target Spot",
                9:"Tomato Mosaic Virus",
                10: "Tomato Yellow Leaf Curl Virus"
            }

            # Use mappings based on the crop type
            if model_name == "tomato":
                predicted_disease = tomato_disease_mapping.get(predicted_class, "Unknown Disease")
            else:
                predicted_disease = f"Class {predicted_class} (mapping not defined)"

        # For binary classification (e.g., 0 = Healthy, 1 = Diseased)
        elif prediction.ndim == 1 and prediction.shape[1] == 1:  # Shape (1,)
            predicted_disease = 'Diseased' if prediction[0] > 0.5 else 'Healthy'

        print(f"Predicted disease: {predicted_disease}")

        return jsonify({'prediction': predicted_disease}), 200

    return jsonify({'error': 'Invalid file format'}), 400



# Paths to required files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BEST_MODEL_PATH = r'C:/Users/avant/Downloads/Innotech/AgriInnovators/server/decimodel.pkl'

# Fertilizer mapping dictionary
FERTILIZER_MAPPING = {
    0: "10-26-26",
    1: "14-35-14",
    2: "17-17-17",
    3: "20-20",
    4: "28-28",
    5: "DAP",
    6: "Urea"
}

# Load the best model during app initialization
def load_model(path):
    try:
        with open(path, 'rb') as model_file:
            model = pickle.load(model_file)
        print("Best model loaded successfully.")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

# Load the best model at the start
model = load_model(BEST_MODEL_PATH)

@app.route('/api/predict-fertilizer', methods=['POST'])
def predict_fertilizer():
    if model is None:
        return jsonify({'error': 'Model not loaded. Please check server logs.'}), 500

    try:
        # Parse JSON data from the frontend
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        # Extract and validate inputs with proper checks
        temperature = data.get('Temperature')
        humidity = data.get('Humidity')
        moisture = data.get('Moisture')
        soil_type = data.get('SoilType')  # Match the field name
        crop_type = data.get('CropType')  # Match the field name
        nitrogen = data.get('Nitrogen')
        potassium = data.get('Potassium')
        phosphorous = data.get('Phosphorus')

        # Ensure all values are provided and not None
        if None in [temperature, soil_type, crop_type, nitrogen, potassium, phosphorous, humidity,moisture]:
            return jsonify({'error': 'Missing or invalid input fields'}), 400

        try:
            # Convert numeric fields to float if valid
            temperature = float(temperature)
            humidity = float(humidity)
            nitrogen = float(nitrogen)
            potassium = float(potassium)
            phosphorous = float(phosphorous)
            moisture = float(moisture)
        except ValueError:
            return jsonify({'error': 'Invalid numeric input values'}), 400

        # Prepare input list
        input_features = [temperature, soil_type, crop_type, nitrogen, potassium, phosphorous, humidity]

        # Encode categorical inputs using LabelEncoder
        label_encoder = LabelEncoder()
        input_features[1] = label_encoder.fit_transform([input_features[1]])[0]  # Soil Type
        input_features[2] = label_encoder.fit_transform([input_features[2]])[0]  # Crop Type

        # Prepare input data for prediction
        input_array = np.array(input_features).reshape(1, -1)
        prediction = model.predict(input_array)
        print(f"Raw prediction: {prediction}")
        # Map prediction to fertilizer name
        predicted_fertilizer = FERTILIZER_MAPPING.get(prediction[0], "Unknown Fertilizer")

        # Return the prediction as JSON
        return jsonify({'predictedFertilizer': predicted_fertilizer}), 200

    except Exception as e:
        return jsonify({'error': f"Error processing the request: {str(e)}"}), 500


# receiving data from sensor
latest_data = {
    "Temperature": None,
    "Humidity": None,
    "Moisture": None,
    "Nitrogen":None,
    "Phosphorous":None,
    "Potassium":None,
}

@app.route('/send_data', methods=['POST'])
def receive_data():
    try:
        # Parse the incoming JSON data
        data = request.get_json()

        # Extract data from the request and store it
        temperature = data.get('Temperature')
        humidity = data.get('Humidity')
        moisture = data.get('Moisture')
        nitrogen = data.get('Nitrogen')
        phosphorous = data.get('Phosphorous')
        potassium = data.get('Potassium')

        # Update the global variable with the new data
        latest_data["Temperature"] = temperature
        latest_data["Humidity"] = humidity
        latest_data["Moisture"] = moisture
        latest_data["Nitrogen"] = nitrogen
        latest_data["Phosphorous"] = phosphorous
        latest_data["Potassium"] = potassium

        return jsonify({"status": "success", "message": "Data received successfully"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/getsensor_data', methods=['GET'])
def getsensor_data():
    return jsonify(latest_data), 200

    

if __name__ == '__main__':
    app.run(debug=True)




if __name__=='__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)



