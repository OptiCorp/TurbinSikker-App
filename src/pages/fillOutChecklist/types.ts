import { WorkflowResponse } from '../../services/apiTypes'

export type ReviewProps = {
    workflow: WorkflowResponse
}

export type DialogProps = {
    workflow: WorkflowResponse
}

export type FillOutListProps = {
    workflow: WorkflowResponse
    setSubmitDialogShowing: (submitDialogShowing: boolean) => void
    submitDialogShowing: boolean
}
