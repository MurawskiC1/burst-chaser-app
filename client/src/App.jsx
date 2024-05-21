
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Navbar from './components/Navbar'
function App() {

  return (
    <>

      <Router>
        <Navbar />
        <AppRoutes />
      </Router>

    </>
  )
}

export default App
