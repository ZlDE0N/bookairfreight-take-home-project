// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import { SavedQuotesButtonHeader } from './components/SavedQuotesButton'
import { Home } from './components/Home'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/saved-quotes' element={<SavedQuotesButtonHeader />} />
      </Routes>
    </div>
  )
}

export default App
