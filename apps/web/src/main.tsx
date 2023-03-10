import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {Routes, Route} from "react-router-dom";

import App from './app/app';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
);
