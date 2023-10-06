import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { SnackbarContext } from '../../../../components/snackbar/SnackBarContext'
import useGlobal from '../../../../context/globalContextProvider'
import apiService from '../../../../services/api'
import { Checklist, Task } from '../../../../services/apiTypes'

export const useEditChecklist = () => {
    const navigate = useNavigate()
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { id } = useParams() as { id: string }

    const [task, setTask] = useState<Task | any>()
    const [taskId, setTaskId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [title, setTitle] = useState<Checklist | string>()

    const { accessToken, currentUser, checklist } = useGlobal()
    const [isOpenn, setIsOpenn] = useState(false)
    const [isOpenNew, setIsOpenNew] = useState(false)
    const api = apiService()
    const handleOpen = (
        taskId: string,
        taskDescription: string,
        categoryId: string
    ) => {
        setTaskId(taskId)
        setCategoryId(categoryId)
        setTaskDescription(taskDescription)
    }

    useEffect(() => {
        if (checklist && checklist.checklistTasks.length === 0) {
            setIsOpenn(true)
        }
    }, [checklist])

    const handleTitleChange = (title: string) => {
        setTitle(title)
    }

    const handleCloseNewCheckList = () => {
        setIsOpenNew(false)
    }
    const { openSnackbar } = useContext(SnackbarContext)



    const handleUpdateTask = async () => {
        try {
            if (!currentUser) return
            const response =
             await api.updateTask(taskId, categoryId, taskDescription,id)

            setDialogShowing(false)

            if (openSnackbar) {
                openSnackbar(`CheckList Created`)
            }
        }
          
       
            






    
}

