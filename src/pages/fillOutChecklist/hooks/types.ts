export type FillOutChecklistForm = {
    id: string
    userId: string
    status: string
    completionTimeMinutes: number
    taskInfos: { [key: string]: string }
}
