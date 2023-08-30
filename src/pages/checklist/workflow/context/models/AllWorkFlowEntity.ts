import { CheckList } from "./WorkFlowEntity"




export type AllWorkFlows = {
    id: string
    checklistId: string
    userId: string
    status: number
    updatedDate: string
    formattedUpdateDate: string
    checklist: CheckList
}