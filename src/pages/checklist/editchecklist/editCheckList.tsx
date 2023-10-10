import { Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import CustomDialog from '../../../components/modal/useModalHook'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist, Task } from '../../../services/apiTypes'
import { Wrapper } from '../previewCheckList/styles'
import { EditHeader } from './EditHeader'
import { EditList } from './EditList/EditList'
import { useEditChecklist } from './hooks/useEditChecklist'

export const EditCheckList = () => {
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { id } = useParams() as { id: string }
    const [checklist, setChecklist] = useState<Checklist>()
    const [tasks, setTasks] = useState<Task[]>([])
    const { accessToken, currentUser } = useGlobal()

    const api = apiService()
    const { handleDelete, setHeaderOpen, headerOpen, handleSave } =
        useEditChecklist()

    useEffect(() => {
        if (!currentUser?.id || !accessToken || !id) return

        const fetchChecklist = async () => {
            try {
                const checklistData = await api.getChecklist(id)

                setChecklist(checklistData)
                if (checklistData?.checklistTasks) {
                    setTasks(checklistData.checklistTasks)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchChecklist()
    }, [accessToken, currentUser?.id, id])

    const handleCloseDelete = () => {
        setDialogDelete(false)
    }

    const handleClose = () => {
        setDialogShowing(false)
    }

    const [title, setTitle] = useState('')

    const [checked, setChecked] = useState(!!checklist?.status)

    useEffect(() => {
        setChecked(checklist?.status === 'Active')
    }, [checklist])

    function convertStatusToString(status: boolean): 'Active' | 'Inactive' {
        return status ? 'Active' : 'Inactive'
    }

    return (
        <div style={{ backgroundColor: '#f0f3f3' }}>
            <>
                <div key={checklist?.id}>
                    <EditHeader
                        dialogShowing={dialogShowing}
                        setDialogShowing={setDialogShowing}
                        isOpenn={headerOpen}
                        setIsOpenn={setHeaderOpen}
                        handleClose={handleClose}
                        title={title}
                        setTitle={setTitle}
                        checked={checked}
                        setChecked={setChecked}
                    />

                    <Wrapper>
                        {headerOpen && <AddTasks />}
                        {checklist && (
                            <EditList
                                key={checklist?.id}
                                checklist={checklist}
                                tasks={tasks}
                            />
                        )}
                    </Wrapper>
                </div>

                <CustomDialog
                    title="Delete checklist?"
                    negativeButtonText="Cancel"
                    positiveButtonText="Delete"
                    positiveButtonColor="danger"
                    positiveButtonOnClick={handleDelete}
                    negativeButtonOnClick={handleCloseDelete}
                    isOpen={dialogDelete}
                >
                    <Typography
                        variant="caption"
                        token={{
                            textAlign: 'center',
                        }}
                    >
                        You sure you want to delete {checklist?.title}?
                    </Typography>
                </CustomDialog>

                <NavActionsComponent
                    buttonColor="danger"
                    secondButtonColor="primary"
                    onClick={() => {
                        setDialogDelete(true)
                    }}
                    secondOnClick={() => {
                        handleSave({
                            title: title,
                            status: convertStatusToString(checked),
                        })
                    }}
                    ButtonMessage="Delete"
                    SecondButtonMessage="Save"
                    isShown={true}
                />
            </>
        </div>
    )
}
