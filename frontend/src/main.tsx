import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MyContextProvider } from './context/MyContext.tsx';
import './index.css';
import { BotPage } from './page/Bot/BotPage.tsx';
import { ContactPage } from './page/Contact/ContactPage.tsx';
import { CryptoPage } from "./page/Crypto/CryptoPage.tsx";
import { HomePage } from './page/HomePage.tsx';
import NotFound from './page/errors/NotFound.tsx';

const router = createBrowserRouter([
  { path: '/', element: <HomePage />},
  { path: '/bot', element: <BotPage />},
  { path: '/bot/:id', element: <BotPage />},
  { path: '/crypto', element: <CryptoPage />},
  { path: '/crypto/:id', element: <CryptoPage />},
  { path: '/contact', element: <ContactPage />},
  { path: '*', element: <NotFound />},
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
