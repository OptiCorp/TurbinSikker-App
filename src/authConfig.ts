import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
      clientId: "PUT_YOUR_CLIENT_ID_HERE", // Client ID 
      authority: 'https://login.microsoftonline.com/PUT_YOUR_TENANT_ID_HERE', // Tenant ID of the React.JS App Registration
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: any, message: string, containsPii: any) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            }
          },
        },
      },
    };
  
// Can be found in the API Permissions of the ASP.NET Web API
export const loginApiRequest = {
  scopes: ["api://PUT_YOUR_WEBAPI_SCOPE_HERE/api.scope"],
};