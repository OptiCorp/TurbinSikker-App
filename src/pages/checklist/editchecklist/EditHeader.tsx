import { Button, TextField, Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import CustomDialog from '../../../components/modal/useModalHook'
import useGlobal from '../../../context/globalContextProvider'
import { Checklist } from '../../../services/apiTypes'
import { COLORS } from '../../../style/GlobalStyles'
import { MakeTitleField } from '../myChecklists/styles'
import { InfoHeader } from '../previewCheckList/styles'
import { EditCard, EditStyledCardHeader, StyledSwitch } from './styles'
type Props = {
    dialogShowing: boolean
    setDialogShowing: (dialogShowing: boolean) => void
    handleClose: () => void
    headerOpen: boolean
    setHeaderOpen: (headerOpen: boolean) => void
    setTitle: (title: string) => void
    title: string
    checked: any
    setChecked: any
    checklist: Checklist
}

export const EditHeader = ({
    setDialogShowing,
    dialogShowing,
    headerOpen,
    setHeaderOpen,
    handleClose,
    title,
    setTitle,
    checked,
    checklist,
    setChecked,
}: Props) => {
    const [changeTitle, setChangeTitle] = useState('')
    const [defaultTitle, setDefaultTitle] = useState('')

    const { currentUser, refreshList } = useGlobal()

    useEffect(() => {
        if (checklist) {
            setDefaultTitle(checklist.title)
        }
        setTitle(changeTitle)
    }, [checklist])

    return (
        <>
            {checklist && (
                <>
                    <InfoHeader>
                        <EditCard>
                            <EditStyledCardHeader>
                                <StyledSwitch
                                    checked={checked}
                                    value={checklist?.status}
                                    onChange={(e) => {
                                        setChecked(e.target.checked)

                                        e.target.checked ? 'Active' : 'Inactive'
                                    }}
                                    label={`checklist is ${
                                        checked ? 'Active' : 'Inactive'
                                    }`}
                                />

                                <TextField
                                    id="storybook-readonly"
                                    value={title || checklist?.title}
                                    key={checklist?.id}
                                    label=""
                                    readOnly
                                    style={{
                                        borderBottom: `1px solid ${COLORS.secondary}`,
                                        background: COLORS.white,
                                    }}
                                    onClick={() => setDialogShowing(true)}
                                />
                                <Button
                                    color="secondary"
                                    as="button"
                                    onClick={() => {
                                        setHeaderOpen(!headerOpen)
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        token={{
                                            textAlign: 'center',
                                            color: COLORS.white,
                                        }}
                                    >
                                        Add Task
                                    </Typography>
                                </Button>
                            </EditStyledCardHeader>
                        </EditCard>
                    </InfoHeader>
                    <>
                        <CustomDialog
                            title="Edit title of checklist"
                            buttonVariant="ghost"
                            negativeButtonOnClick={handleClose}
                            negativeButtonText="Cancel"
                            positiveButtonText="Save"
                            positiveButtonOnClick={() => {
                                if (changeTitle) {
                                    setTitle(changeTitle)
                                } else {
                                    setTitle(defaultTitle)
                                }
                                setDialogShowing(false)
                            }}
                            isOpen={dialogShowing}
                        >
                            <MakeTitleField
                                id="storybook-readonly"
                                placeholder="name"
                                defaultValue={changeTitle || defaultTitle}
                                label=""
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setChangeTitle(event.target.value)
                                }}
                                style={{
                                    borderBottom: `1px solid ${COLORS.secondary}`,
                                    background: COLORS.white,
                                }}
                            />
                        </CustomDialog>
                    </>
                </>
            )}
        </>
    )
}
