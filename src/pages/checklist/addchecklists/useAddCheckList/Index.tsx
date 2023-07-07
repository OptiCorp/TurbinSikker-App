import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'

import { SnackbarContext } from '../../../../components/snackbar/SnackBarContext'
import { FormValues } from '../../../../models/FormValuesEntity'
import { ApiContext } from '../../../../pages/context/apiContextProvider'
import useAuth from '../../../../pages/landingPage/context/LandingPageContextProvider'

interface TaskEntity extends Task {
    categoryId: string
    category: string
}

interface Task {
    id: string
    description: string
}

export const useAddCheckList = () => {
    const { idToken } = useAuth()
    const navigate = useNavigate()
    const appLocation = useLocation()
    const methods = useForm<FormValues>()
    const { reset } = methods
    const { id } = useParams()
    const { allCheckList } = useContext(ApiContext)
    const user = allCheckList.find((x) => x.id === id)
    const { openSnackbar } = useContext(SnackbarContext)
    const [tasks, setTasks] = useState<TaskEntity[]>([])
    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const checklistData = {
            title: data.title,
            status: data.status,
            tasks: tasks.map((task) => ({
                id: task.id,
                description: task.description,
            })),
        }

        if (appLocation.pathname === '/AddCheckList/') {
            await fetch('http://20.251.37.226:8080/api/AddChecklist', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            reset()

            navigate('/MyChecklists', {
                state: { refreshCheckLists: data.title },
            })

            if (openSnackbar) {
                openSnackbar('CheckList created!')
            }
        } else {
            await fetch(
                `http://20.251.37.226:8080/api/UpdateChecklist?id=${id}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            navigate('/MyChecklists', {
                state: { refreshCheckLists: data.title },
            })
            if (openSnackbar) {
                openSnackbar('CheckList edited!')
            }
        }
    }

    return {
        methods,
        onSubmit,
        location: appLocation.pathname,
        user,
        tasks,
        setTasks,
    }
}
