import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SnackBarProvider } from '@components/SnackBarProvider/SnackBarProvider.tsx'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackBarProvider>
      <App />
    </SnackBarProvider>
  </React.StrictMode>
)
