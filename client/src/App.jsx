import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';

function App() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const hoverAreaHeight = 50; // The height of the area at the bottom where hover triggers the footer
      if (window.innerHeight - event.clientY <= hoverAreaHeight) {
        setFooterVisible(true);
      } else {
        setFooterVisible(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <div className='page-container'>
          <AppRoutes />
        </div>
        <footer className={`footer ${footerVisible ? 'visible' : ''}`}>
          <p>This is the footer content.</p>
        </footer>
      </Router>
    </>
  );
}

export default App;
