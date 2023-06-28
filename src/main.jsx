import React from 'react'
import { ContextProvider } from './context/userContext/Context.jsx'
import { UIContextProvider } from './context/taskContext/Context.jsx'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  <ContextProvider>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </ContextProvider>
  // </React.StrictMode>
)
