import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //comment out the strict mode that is used for development it double renders things
  //<React.StrictMode>
  <App />
  //</React.StrictMode>,
)
