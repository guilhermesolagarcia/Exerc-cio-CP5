import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx';
import { Login } from '../routes/Login/index.tsx'
import { Cadastro } from '../routes/Cadastro/index.tsx';

import { Home } from '../routes/Home/index.tsx'
import { AuthProvider } from './Contexts/AuthProvider.tsx';

import './globals.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, 
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cadastro",
        element: <Cadastro />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)