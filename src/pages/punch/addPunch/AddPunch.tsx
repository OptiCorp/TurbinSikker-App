import {
    Button,
    CircularProgress,
    Dialog,
    Icon,
    TextField,
    Typography,
} from '@equinor/eds-core-react'
import { image, upload } from '@equinor/eds-icons'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import SeverityButton from '../severityButton/SeverityButton'
import { useAddPunch } from './AddPunchHook'
import {
    PunchAddContainer,
    PunchAddUploadContainer,
    PunchUploadButtonContainer,
    PunchUploadButtonIconContainer,
    PunchUploadButtonLabel,
    PunchUploadFileContainer,
    PunchUploadFilesContainer,
    SeverityButtonWrapper,
    SeverityContainer,
} from './styles'
import { usePunch } from '../PunchHook'
import { PunchUploadContainer } from '../styles'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'
import { useHasPermission } from '../../../pages/users/hooks/useHasPermission'
import { ApiStatus, PunchItem, Status, Upload } from '../../../services/apiTypes'
import { COLORS } from '../../../style/GlobalStyles'

export function AddPunch({ punch }: { punch?: PunchItem }) {
    const navigate = useNavigate()
    const {
        onSubmit,
        positiveOpen,
        handleOpen,
        handleSubmit,
        clearAndClose,
        userInput,
        setUserInput,
        setFile,
        file,
        handleRejectOpen,
        handleRejectClose,
        rejectDialogOpen,
        setMessage,
        setStatus,
    } = useAddPunch()
    const { hasPermission } = useHasPermission()
    const { fetchUploadStatus, loading, uploads: addedUploads } = usePunch()
    const appLocation = useLocation()
    const [uploads, setUploads] = useState(false)
    const [rejectMessageDialog, setRejectMessageDialog] = useState(true)
    function loadFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const path = appLocation.pathname.split('/')
    const lastPathSegment = path[path.length - 1]

    return (
        <form id="punchForm" style={{ position: 'relative' }} onSubmit={handleSubmit(onSubmit)}>
            <PunchAddContainer>
                {!(addedUploads?.length > 0) ? (
                    <PunchAddUploadContainer>
                        <PunchUploadButtonContainer disabled={hasPermission}>
                            <PunchUploadButtonIconContainer disabled={hasPermission}>
                                <Icon
                                    data={upload}
                                    color={hasPermission ? COLORS.lightGray : COLORS.black}
                                    size={48}
                                />
                            </PunchUploadButtonIconContainer>

                            <PunchUploadButtonLabel htmlFor="file">Upload</PunchUploadButtonLabel>

                            <input
                                id="file"
                                type="file"
                                disabled={hasPermission}
                                accept="image/*"
                                name="image"
                                onChange={loadFile}
                                style={{ display: 'none' }}
                            />
                        </PunchUploadButtonContainer>

                        {!file ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    alignItems: 'center',
                                    color: COLORS.secondary,
                                }}
                                onClick={() => setUploads((prev) => !prev)}
                            >
                                <span>No Uploads</span>
                            </div>
                        ) : (
                            <PunchUploadFilesContainer>
                                <Typography variant="h5">Upload Files</Typography>

                                <PunchUploadFileContainer
                                    onClick={() => setUploads((prev) => !prev)}
                                >
                                    {file?.name && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Icon color={COLORS.primary} data={image} />
                                                <Typography variant="caption">
                                                    {file?.name}
                                                </Typography>
                                            </div>
                                        </div>
                                    )}
                                </PunchUploadFileContainer>
                            </PunchUploadFilesContainer>
                        )}
                    </PunchAddUploadContainer>
                ) : (
                    <PunchUploadContainer>
                        {fetchUploadStatus === ApiStatus.LOADING && <CircularProgress />}
                        {fetchUploadStatus !== ApiStatus.LOADING && addedUploads?.length > 0 ? (
                            <div style={{ display: 'flex', overflowX: 'auto' }}>
                                {addedUploads?.map((upload: Upload, idx) => {
                                    return (
                                        <img
                                            key={idx}
                                            src={`data:image/png;base64, ${upload.bytes}`}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <p>No uploads available.</p>
                        )}
                    </PunchUploadContainer>
                )}
                {punch?.checklistTask && (
                    <>
                        <Typography variant="h4">Report name</Typography>
                        <p>{punch?.checklistTask.description}</p>
                    </>
                )}

                <Typography variant="h4">Description</Typography>
                {appLocation.pathname === '/AddPunch' ? (
                    <TextField
                        id=""
                        value={!punch?.description ? userInput.description : undefined}
                        multiline
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInput((prevUserInput) => ({
                                ...prevUserInput,
                                description: event.target.value,
                            }))
                        }}
                    />
                ) : (
                    <TextField
                        id=""
                        multiline
                        disabled={
                            (Status.REJECTED !== punch?.status && lastPathSegment !== 'addpunch') ||
                            hasPermission
                        }
                        key={punch?.id ?? ''}
                        required
                        defaultValue={punch?.description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInput({
                                ...userInput,
                                description: event.target.value,
                            })
                        }}
                    />
                )}

                <SeverityContainer>
                    <Typography variant="h4">Severity</Typography>
                    <SeverityButtonWrapper>
                        <SeverityButton
                            defaultValue={(punch?.severity as string) || 'Minor'}
                            userInput={userInput}
                            setUserInput={setUserInput}
                            punch={punch}
                        />
                    </SeverityButtonWrapper>
                </SeverityContainer>
            </PunchAddContainer>

            <Dialog open={rejectDialogOpen}>
                <Dialog.Header>
                    <Dialog.Title>Reject Punch?</Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography group="input" variant="text" token={{ textAlign: 'left' }}>
                        Request will be rejected and returned to sender.
                    </Typography>
                    <div style={{ marginTop: '10px' }}>
                        <label htmlFor="comment">Add Message</label>
                        <TextField
                            id="comment"
                            multiline
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setMessage(e.target.value)
                            }
                        />
                    </div>
                </Dialog.CustomContent>

                <Dialog.Actions>
                    <div>
                        <Button variant="ghost" color="danger" onClick={handleRejectClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setStatus('Rejected')
                                navigate(-1)
                            }}
                            type="submit"
                            form="punchForm"
                            color="danger"
                        >
                            OK
                        </Button>
                    </div>
                </Dialog.Actions>
            </Dialog>
            {punch?.status === Status.REJECTED && !hasPermission && (
                <Dialog open={rejectMessageDialog}>
                    <Dialog.Header>
                        <Dialog.Title>Punch Message</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CustomContent style={{ maxHeight: '50px', overflowY: 'auto' }}>
                        <Typography
                            group="input"
                            color="disabled"
                            variant="text"
                            token={{ textAlign: 'left' }}
                        >
                            {punch.message}
                        </Typography>
                    </Dialog.CustomContent>
                    <Dialog.Actions>
                        <div>
                            <Button variant="ghost" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                            <Button onClick={() => setRejectMessageDialog(false)}>Update</Button>
                        </div>
                    </Dialog.Actions>
                </Dialog>
            )}

            <Dialog open={positiveOpen}>
                <Dialog.Header>
                    <Dialog.Title>
                        {!hasPermission &&
                            (lastPathSegment === 'addpunch' ? 'Send punch?' : 'Update punch?')}
                        {hasPermission && 'Approve Punch?'}
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography group="input" variant="text" token={{ textAlign: 'left' }}>
                        {!hasPermission &&
                            (lastPathSegment === 'addpunch'
                                ? 'Send punch? Request will be sent for further approval and management'
                                : 'Update punch? Punch will be update and be sent for further approval')}
                        {hasPermission && 'Punch will be approved'}
                    </Typography>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <div>
                        <Button variant="ghost" onClick={clearAndClose}>
                            Cancel
                        </Button>
                        {!hasPermission && (
                            <Button type="submit" form="punchForm">
                                {lastPathSegment === 'addpunch' ? 'Send Punch' : 'Update Punch'}
                            </Button>
                        )}
                        {hasPermission && (
                            <Button
                                onClick={() => {
                                    setStatus('Approved')
                                    navigate(-1)
                                }}
                                type="submit"
                                form="punchForm"
                            >
                                Approve
                            </Button>
                        )}
                    </div>
                </Dialog.Actions>
            </Dialog>

            {lastPathSegment !== 'addpunch' && punch?.status !== Status.REJECTED ? (
                <DefaultNavigation hideNavbar={false} />
            ) : !hasPermission ? (
                <NavActionsComponent
                    ButtonMessage="Cancel"
                    SecondButtonMessage={
                        lastPathSegment === 'addpunch' ? 'Submit punch' : 'Update punch'
                    }
                    secondButtonColor="primary"
                    buttonVariant="outlined"
                    secondOnClick={handleOpen}
                    onClick={() => {
                        navigate(`/Punches`)
                    }}
                    primaryType="button"
                    type="button"
                    isShown={true}
                />
            ) : (
                <DefaultNavigation hideNavbar={false} />
            )}

            {punch?.status === Status.PENDING && hasPermission && (
                <NavActionsComponent
                    ButtonMessage="Reject"
                    SecondButtonMessage={'Approve'}
                    secondButtonColor="primary"
                    buttonVariant="outlined"
                    buttonColor="danger"
                    secondOnClick={handleOpen}
                    onClick={handleRejectOpen}
                    type="button"
                    primaryType="button"
                    isShown={true}
                />
            )}
        </form>
    )
}
