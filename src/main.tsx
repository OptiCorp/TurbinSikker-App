import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";

const configuration: Configuration = {
  auth: {
      clientId: "95763e09-e04c-48a8-99a6-a878ed99d774",
      authority: "https://login.microsoftonline.com/df4dc9e8-cc4f-4792-a55e-36f7e1d92c47"
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
