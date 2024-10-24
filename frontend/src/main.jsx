import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import App from './App.jsx'
import theme from './theme.js'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode}  />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
