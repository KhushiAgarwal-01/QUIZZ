import { useState } from 'react'
// import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './pages/signin';
import Signout from './pages/signout';
import Quiz from './pages/Quiz';

 export default function App(){
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/signin" element={<Signin/>} />
    <Route path="/signout" element={<Signout/>} />
    <Route path="/quiz" element={<Quiz/>} />


   </Routes>
   </BrowserRouter>
  )
}

