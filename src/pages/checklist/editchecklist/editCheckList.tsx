import { useAddTaskForm } from '@components/addtasks/hooks/useAddTaskForm'
import CustomDialog from '@components/modal/useModalHook'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Typography } from '@equinor/eds-core-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import { Wrapper } from '../previewCheckList/styles'
import { EditHeader } from './EditHeader'
import { EditList } from './EditList/EditList'
import { useEditCheckListContext } from './context/editCheckListContextProvider'

export const EditCheckList = () => {
    const navigate = useNavigate()
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { openSnackbar } = useContext(SnackbarContext)
    const { id } = useParams()

    const handleDeleteChecklist = async () => {
        try {
            handleDelete(id)
            setDialogDelete(false)
            navigate('/MyChecklists')
            if (openSnackbar) {
                openSnackbar(`CheckList deleted`)
            }
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }

    const handleCloseDelete = () => {
        setDialogDelete(false)
    }

    const handleClose = () => {
        setDialogShowing(false)
    }
    const [title, setTitle] = useState('')
    const { checkListById, sortedTasks } = useAddTaskForm()
    const {
        handleSave,

        isOpenn,
        setIsOpenn,
        handleDelete,
    } = useEditCheckListContext()

    const [checked, setChecked] = useState(!!checkListById?.status)

    useEffect(() => {
        setChecked(checkListById?.status === 'Active')
    }, [checkListById])

    function convertStatusToString(status: boolean): 'Active' | 'Inactive' {
        return status ? 'Active' : 'Inactive'
    }

    return (
        <div style={{ backgroundColor: '#f0f3f3' }}>
            {checkListById && (
                <>
                    <div key={checkListById.id}>
                        <EditHeader
                            dialogShowing={dialogShowing}
                            setDialogShowing={setDialogShowing}
                            isOpenn={isOpenn}
                            setIsOpenn={setIsOpenn}
                            handleClose={handleClose}
                            title={title}
                            setTitle={setTitle}
                            checked={checked}
                            setChecked={setChecked}
                        />

                        <Wrapper>
                            {isOpenn && <AddTasks />}

                            <EditList
                                key={checkListById.id}
                                tasks={checkListById}
                                sortedTasks={sortedTasks}
                            />
                        </Wrapper>
                    </div>

                    <CustomDialog
                        title="Delete checklist?"
                        negativeButtonText="Cancel"
                        positiveButtonText="Delete"
                        positiveButtonColor="danger"
                        positiveButtonOnClick={handleDeleteChecklist}
                        negativeButtonOnClick={handleCloseDelete}
                        isOpen={dialogDelete}
                    >
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                            }}
                        >
                            You sure you want to delete {checkListById.title}?
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
            )}
        </div>
    )
}
