import Navbar from '../src/components/Navbar'
import Home from './Pages/Home'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import CropRecommendation from './Pages/CropRecomendation/CropRecomendation'
import DiseasePredictionPage from './Pages/Disease/Disease'

function App() {

  return (
    <>
    <Router>
    <Navbar/>
    <Routes> 
      <Route path='/' element={<Home/>}/>
      <Route path="/crop-recommend" element={<CropRecommendation/>}/>
      <Route path="/disease-predict" element={<DiseasePredictionPage/>}/>
     </Routes>
     </Router>
    </>
  )
}

export default App
