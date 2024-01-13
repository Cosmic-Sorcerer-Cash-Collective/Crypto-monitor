import React from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from 'react-dom/client'
import './index.css'
import { MyContextProvider } from './context/MyContext.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './page/Home.tsx';
import { Contact } from './page/Contact.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Home />},
  { path: '/instance/:id', element: <Home />},
  { path: '/contact', element: <Contact />},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <MyContextProvider>
          <RouterProvider router={router} />
      </MyContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
