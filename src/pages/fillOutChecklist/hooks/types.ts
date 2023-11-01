export type DatasetRecord = {
    [taskId: string]: TaskInfos
}
export type TaskInfos = {
    taskId: string
    status: number
}

export type FillOutChecklistEntity = {
    id: string
    userId: string
    status: string
    completionTimeMinutes: number
    taskInfos: { id: string; taskId: string; status: number }[]
}
