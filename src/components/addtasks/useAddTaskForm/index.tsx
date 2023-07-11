import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import { FormValuesEntity } from 'src/models/FormValuesEntity'

import { CheckListEntity } from 'src/models/CheckListEntity'
import { TaskEntity } from 'src/models/TaskEntity'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'

export const useAddTaskForm = () => {
    const { id } = useParams()
    const { idToken } = useAuth()
    const appLocation = useLocation()
    const methods = useForm<FormValuesEntity>()
    const [refreshList, setRefreshList] = useState<boolean>(false)
    const { openSnackbar } = useContext(SnackbarContext)

    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTask, setSelectedTask] = useState('')
    const [checkListId, setCheckListId] = useState<CheckListEntity | null>(null)
    const [sortedTasks, setSortedTasks] = useState<TaskEntity[]>([])

    const onSubmit: SubmitHandler<FormValuesEntity> = async (data) => {
        console.log(data)
        {
            const res = await fetch(
                `https://localhost:7290/api/AddTaskToChecklist?checklistId=${id}&taskId=${data.task}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )
            if (res.ok) setRefreshList((prev) => !prev)
            if (openSnackbar) {
                openSnackbar('CheckList created!')
            }
        }
    }

    const fetchAllCheckListsId = async () => {
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
        fetchAllCheckListsId()
    }, [refreshList])

    return {
        methods,
        onSubmit,
        location: appLocation.pathname,
        selectedOption,

        selectedTask,
        sortedTasks,
        checkListId,

        refreshList,
    }
}
