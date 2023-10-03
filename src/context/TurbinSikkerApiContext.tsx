import React, { ReactNode, useEffect, useState } from "react";
import { ApiService } from "../services/api";
import { ApiStatus } from "../services/apiTypes";

import { Progress, Typography } from "@equinor/eds-core-react";
import PageNotFound from "../pages/PageNotFound";
import useAuth, { AuthContextType } from '../pages/landingPage/context/LandingPageContextProvider';
import { useUserContext } from "../pages/users/context/userContextProvider";


const TurbinSikkerApiContext = React.createContext({} as TurbinSikkerApiProps);


type TurbinSikkerApiProps = {
    api: ApiService
    auth: AuthContextType
    fetchChecklistStatus: ApiStatus
    accessToken: string
};



type TurbinSikkerApiContextProviderProps = {
    children: ReactNode;
    auth: AuthContextType
    api: ApiService
    fetchChecklistStatus: ApiStatus,
    accessToken: string
//     appConfig: AppConfig;
//     featureFlags: FeatureFlags;
//    acessToken: string
//     ipoApi: ProcosysIPOApiService;
};






const TurbinSikkerApiContextProvider: React.FC<TurbinSikkerApiContextProviderProps> = ({
children, api, auth,
}: TurbinSikkerApiContextProviderProps) => {
    const { accessToken } = useAuth()

    const [fetchChecklistStatus, setFetchChecklistStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    );


    // const [checklistWorkFlows, setChecklistWorkFlow] = useState<WorkFlow[]>([])
    // const [allWorkFlows, setAllWorkFlows] = useState<AllWorkFlows[]>([])
    // const [workFlowById, setWorkFlowById] = useState<WorkFlow>()
    // const { workflowId } = useParams()
    const { currentUser } = useUserContext()

    const {
        accounts,

        accountname,

        inProgress,
    } = useAuth()



    useEffect(() => {
        (async (): Promise<void> => {
            setFetchChecklistStatus(ApiStatus.LOADING);
            try {
               
         
                setFetchChecklistStatus(ApiStatus.SUCCESS);
            } catch (error) {
                setFetchChecklistStatus(ApiStatus.ERROR);
            }
        })();
    }, [api]);



    if (fetchChecklistStatus === ApiStatus.LOADING) {
        return  <Progress.Circular> <Typography variant="h4" as="h2">
      Loading
      </Typography></Progress.Circular>;
    }
    if (fetchChecklistStatus === ApiStatus.ERROR) {
        return (<PageNotFound/>)
    }

return (

<TurbinSikkerApiContext.Provider value={{fetchChecklistStatus, api,auth, accessToken}}>

    {children}
</TurbinSikkerApiContext.Provider>
)



}

export { TurbinSikkerApiContext, TurbinSikkerApiContextProvider };

