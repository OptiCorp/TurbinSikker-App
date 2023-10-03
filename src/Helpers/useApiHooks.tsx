import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useAuth from "../context/AuthContextProvider";
import { TurbinSikkerApiContext } from "../context/TurbinSikkerApiContext";
import { useUserContext } from "../pages/users/context/userContextProvider";
import apiService from "../services/api";

export type apiParams = {
id: string
punchId: string
workflowId: string
userId: string
taskId: string

}


export const useApiHooks = () => {
    
    const {
        api,

        auth,

     
    } = useContext(TurbinSikkerApiContext)

const params = useParams<apiParams>()

const {accessToken} = useAuth()

const apii = apiService(accessToken)


const location = useLocation()

const  { currentUser } = useUserContext()

const currentUserId: string| undefined= currentUser?.id

const navigate = useNavigate()

    return {
        api,
        accessToken,
        location,
   params,
navigate,
        auth,
        currentUserId,
    currentUser: currentUser
     
    

    };
};