import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { TurbinSikkerApiContext } from "src/context/TurbinSikkerApiContext";

const useApiHooks = () => {
    const {
        api,
        auth,

     
    } = useContext(TurbinSikkerApiContext)

const {id, taskId, workflowId, punchId} = useParams()

const location = useLocation()

const navigate = useNavigate()

    return {
        api,
        location,
        id,
        taskId,
        workflowId,
        punchId,

        auth,
      
    
     
    

    };
};