import { CheckList } from "./WorkFlowEntity"




export type AllWorkFlows = {
    id: string
    checklistId: string
    userId: string
    status: number | null
    updatedDate: string
    formattedUpdateDate: string
    checklist: CheckList
}