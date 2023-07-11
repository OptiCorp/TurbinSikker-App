export type TaskEntity = {
    id: string
    tasks: TaskEntity[]
    value: string
    categoryId: string
    description: string
    category: { id: string; name: string }
}
