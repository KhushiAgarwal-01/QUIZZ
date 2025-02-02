import { useState } from 'react'
// import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Quiz from './pages/Quiz';

 export default function App(){
  return (
   <BrowserRouter>
   <Routes>

    <Route path="/" element={<Quiz/>} />


   </Routes>
   </BrowserRouter>
  )
}

