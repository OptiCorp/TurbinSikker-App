// import { useState } from "react"
// import { useForm, SubmitHandler } from "react-hook-form"
// import { useNavigate } from "react-router"
// import { API_URL } from "src/config"
// import { useCheckListContext } from "src/pages/context/CheckListContextProvider"
// import useAuth from "src/pages/landingPage/context/LandingPageContextProvider"
// import { useUserContext } from "src/pages/users/context/userContextProvider"
// import { useWorkflowContext } from '../workflow/context/workFlowContextProvider'



// export type FillOutForm = {
//     checklistId: string
//     userIds: {
//         value: string
//         label: string
//     }[]
//     status: string
// }
// export const useAddWorkFlowForm = () => {
//     const methods = useForm<FillOutForm>()

//     const { handleSubmit, control } = methods
//     const { WorkFlows } = useWorkflowContext()
//     const { accessToken } = useAuth()
//     const [positiveOpen, setPositiveOpen] = useState(false)
//     const { setRefreshList } = useCheckListContext()
//     const { currentUser } = useUserContext()
//     const handleOpen = () => {
//         setPositiveOpen(true)
//     }
//     const clearAndClose = () => {
//         setPositiveOpen(false)
//     }

//     const onSubmit: SubmitHandler<FillOutForm> = async (data) => {
//         const res = await fetch(`${API_URL}/CreateChecklistWorkFlow`, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//             },
//             body: JSON.stringify({
//                 id: WorkFlow.id,
//             checklistId: WorkFlow.checklist.id,
//             userId: WorkFlow.userId,
//             status: 'Committed',
//             }),
//         })
//         if (res.ok) setRefreshList((prev) => !prev)
      
     
        
//     }

//     return {
//         methods,
//         onSubmit,
//         control,
//         handleSubmit,
//         handleOpen,
//         clearAndClose,
//         positiveOpen,
//     }
// }





// const handleSubmit = async () => {
        
//     try {
//         onUpdate({
//             id: WorkFlow.id,
//             checklistId: WorkFlow.checklist.id,
//             userId: WorkFlow.userId,
//             status: 'Committed',
//         }) 
//     } catch (error) {
//         console.error('Error creating checklist:', error)
//     } 
// } 
