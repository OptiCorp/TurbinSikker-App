import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";

const configuration: Configuration = {
  auth: {
      clientId: "73b505c0-1edd-4fcd-8545-d024892a11d5"
  }
};

const pca = new PublicClientApplication(configuration);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <BrowserRouter>   
        <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>,
)
