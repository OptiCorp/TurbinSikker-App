export type TaskEntity = {
    id: string
    categoryId: string
    description: string
    category: { id: string; name: string }
}
