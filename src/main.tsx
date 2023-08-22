import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const configuration: Configuration = {
  auth: {
    clientId: "b1bc9eb7-71fc-43c4-a888-ae73c72be014",
    authority:
      "https://login.microsoftonline.com/2d89021a-6a8a-4063-a9fe-b4777c4088f1/",
  },
};

const pca = new PublicClientApplication(configuration);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);
