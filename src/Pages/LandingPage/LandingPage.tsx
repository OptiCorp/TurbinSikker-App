import { useState } from "react";
// import { useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
//import { InteractionRequiredAuthError, InteractionStatus,} from "@azure/msal-browser";


export const LandingPage = () => {
    //const { instance, inProgress, accounts } = useMsal();
    const { inProgress, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    //const [apiData, setApiData] = useState(null);
    const [apiData] = useState(null);
    console.log(account);

    /*
    Trying to get token :')


    useEffect(() => {
        if (account) {
            console.log(account);
            instance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: account
            }).then((response) => {
                console.log(response);
                if(response) {
                    callMsGraph(response.accessToken).then((result) => setApiData(result));
                }
            });
        }
    }, [account, instance]);
    

    useEffect(() => {
        if (!apiData && inProgress === InteractionStatus.None) {
          const accessTokenRequest = {
            scopes: ["user.read"],
            account: accounts[0],
          };
          console.log(account);
          instance
            .acquireTokenSilent(accessTokenRequest)
            .then((accessTokenResponse) => {
              // Acquire token silent success
              const accessToken = accessTokenResponse.accessToken;
              // Call your API with token
              callApi(accessToken).then((response) => {
                console.log(response)
                setApiData(response);
              });
            })
            .catch((error) => {
              if (error instanceof InteractionRequiredAuthError) {
                instance
                  .acquireTokenPopup(accessTokenRequest)
                  .then(function (accessTokenResponse) {
                    // Acquire token interactive success
                    const accessToken = accessTokenResponse.accessToken;
                    // Call your API with token
                    callApi(accessToken).then((response) => {
                      setApiData(response);
                    });
                  })
                  .catch(function (error) {
                    // Acquire token interactive failure
                    console.log(error);
                  });
              }
              console.log(error);
            });
        }
      }, []);
    */
   
    if (accounts.length > 0) {
        return (
            <>
                <span>There are currently {accounts.length} users signed in!</span>
                {apiData && (<span>Data retrieved from API: {JSON.stringify(apiData)}</span>)}
            </>
        );
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}