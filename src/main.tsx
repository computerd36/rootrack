import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-grid-layout/css/styles.css'
import { BrowserRouter } from 'react-router-dom'

//Fonts
import '@fontsource-variable/gabarito';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
)
