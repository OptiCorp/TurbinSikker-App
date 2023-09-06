import { AllWorkFlows, CheckList, WorkFlow } from '../types'

export type TWorkflowContext = {
    WorkFlows: WorkFlow[]
    checklist?: CheckList
    testData?: string
    allWorkFlows: AllWorkFlows[]
}
