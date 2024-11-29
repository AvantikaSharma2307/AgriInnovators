import Navbar from '../src/components/Navbar'
import Home from './Pages/Home'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import CropRecommendation from './Pages/CropRecomendation/CropRecomendation'
import DiseasePredictionPage from './Pages/Disease/Disease'
import Footer from './components/Footer'
import FertilizerPrediction from './Pages/FertilizerPrediction/Fertilizerpredict'
import WeatherPrediction from './Pages/WeatherPredict/WeatherPrediction'



function App() {
  // useEffect(()=>{
  //   fetchData();
  // },[]);
  return (
    <>
    <Router>
    <Navbar/>
    <Routes> 
      <Route path='/' element={<Home/>}/>
      <Route path="/predict_crop" element={<CropRecommendation/>}/>
      <Route path="/api/disease-prediction" element={<DiseasePredictionPage/>}/>
      <Route path="/api/predict-fertilizer" element={<FertilizerPrediction/>}/>
      <Route path="/predict-weather" element={<WeatherPrediction/>}/>
      
    
     
     </Routes>
     <Footer/>
     </Router>
    </>
  )
}

export default App
