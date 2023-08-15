import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import { Typography } from '@equinor/eds-core-react'
import { useNavigate, useParams } from 'react-router'

import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useState } from 'react'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import { useApiContext } from '../../context/apiContextProvider'

import { Wrapper } from '../previewCheckList/styles'
import { EditList } from './EditList/EditList'

import CustomDialog from '@components/modal/useModalHook'
import { EditHeader } from './EditHeader'
import { useEditCheckList } from './hooks/useEditCheckList'

export const EditCheckList = () => {
    const navigate = useNavigate()
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { openSnackbar } = useContext(SnackbarContext)
    const { handleDelete } = useApiContext()
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

    const { checkListId, sortedTasks } = useAddTaskForm()
    const { handleSave, checked, convertStatusToString, isOpenn, setIsOpenn } =
        useEditCheckList()

    return (
        <div style={{ backgroundColor: '#f0f3f3' }}>
            {checkListId && (
                <>
                    <div key={checkListId.id}>
                        <EditHeader
                            dialogShowing={dialogShowing}
                            setDialogShowing={setDialogShowing}
                            isOpenn={isOpenn}
                            setIsOpenn={setIsOpenn}
                            handleClose={handleClose}
                            title={title}
                            setTitle={setTitle}
                        />

                        <Wrapper>
                            {isOpenn && <AddTasks />}

                            <EditList
                                key={checkListId.id}
                                tasks={checkListId}
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
                            You sure you want to delete {checkListId.title}?
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
