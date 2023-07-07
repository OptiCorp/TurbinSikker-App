import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CheckListEntity } from 'src/models/CheckListEntity'
import { TaskEntity } from 'src/models/TaskEntity'

export const usePreviewList = () => {
    const [checkListId, setCheckListId] = useState<CheckListEntity | null>(null)
    const { id } = useParams()
    const [sortedTasks, setSortedTasks] = useState<TaskEntity[]>([])

    const fetchAllCheckLists = async () => {
        const res = await fetch(
            `http://20.251.37.226:8080/api/GetChecklist?id=${id}`
        )
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()
        const sorted = data.tasks.sort((a: any, b: any) => {
            // Compare the category names
            if (a.category.name < b.category.name) {
                return -1
            } else if (a.category.name > b.category.name) {
                return 1
            } else {
                return 0
            }
        })

        setSortedTasks(sorted)
        setCheckListId(data)
    }
    useEffect(() => {
        fetchAllCheckLists()
    }, [])

    return {
        fetchAllCheckLists,
        sortedTasks,
        checkListId,
    }
}
