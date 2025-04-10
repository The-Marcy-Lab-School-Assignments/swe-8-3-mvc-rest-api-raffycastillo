import {
  Routes, Route
} from 'react-router-dom';
import './App.css'
import {
  Home,
  EntryDetails
} from './pages'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/entries/:id' element={<EntryDetails />} />
      </Routes>
    </>
  )
}

export default App
