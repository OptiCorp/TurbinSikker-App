import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
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

import { usePunchContext } from '../context/PunchContextProvider'
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
import { Upload } from 'src/types/Upload'
import { PunchUploadContainer } from '../styles'
import { usePunch } from '../PunchHook'

export function AddPunch() {
    const navigate = useNavigate()
    const [uploads, setUploads] = useState(false)
    const {
        onSubmit,
        description,
        positiveOpen,
        handleOpen,
        handleSubmit,
        clearAndClose,
        setDescription,
        setFile,
        file,
        severity,
        setSeverity,
    } = useAddPunch()
    const { loading, uploads: addedUploads } = usePunch()
    const appLocation = useLocation()
    const { punch } = usePunchContext()
    function loadFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }
    const path = appLocation.pathname.split('/')
    const lastPathSegment = path[path.length - 1]
    return (
        <form id="punchForm" onSubmit={handleSubmit(onSubmit)}>
            <PunchAddContainer>
                {!(addedUploads?.length > 0) ? (
                    <PunchAddUploadContainer>
                        <PunchUploadButtonContainer>
                            <PunchUploadButtonIconContainer>
                                <Icon data={upload} size={48} />
                            </PunchUploadButtonIconContainer>

                            <PunchUploadButtonLabel htmlFor="file">Upload</PunchUploadButtonLabel>

                            <input
                                id="file"
                                type="file"
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
                                    color: '#243746',
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
                                                <Icon color="#73B1B5" data={image} />
                                                <Typography variant="caption">
                                                    {file?.name}
                                                </Typography>
                                            </div>
                                        </div>
                                    )}
                                    {/* <Icon
                                    onClick={(e) => console.log(e.currentTarget)}
                                    data={close}
                                    color="#243746"
                                    size={16}
                                /> */}
                                </PunchUploadFileContainer>
                            </PunchUploadFilesContainer>
                        )}
                    </PunchAddUploadContainer>
                ) : (
                    <PunchUploadContainer>
                        {loading && <CircularProgress />}
                        {!loading && addedUploads?.length > 0 ? (
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
                {/* <h4>Report name</h4> */}
                <Typography variant="h4">Report name</Typography>
                {!punch?.checklistTask ? (
                    <p>...</p>
                ) : (
                    <div style={{ display: 'flex', gap: 4 }}>
                        <p>{punch?.checklistTask.description}</p>
                    </div>
                )}

                <Typography variant="h4">Description</Typography>
                {appLocation.pathname === '/AddPunch' ? (
                    <TextField
                        id=""
                        // label="Description"
                        value={!punch?.description ? description : undefined}
                        multiline
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDescription(event.target.value)
                        }}
                    />
                ) : (
                    <TextField
                        id=""
                        // label="Description"
                        multiline
                        key={punch?.id ?? ''}
                        required
                        defaultValue={punch?.description ?? ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDescription(event.target.value)
                        }}
                    />
                )}

                <SeverityContainer>
                    <Typography variant="h4">Severity</Typography>
                    <SeverityButtonWrapper>
                        <SeverityButton
                            defaultValue={punch?.severity ?? 'Minor'}
                            severity={severity}
                            setSeverity={setSeverity}
                        />
                    </SeverityButtonWrapper>
                </SeverityContainer>
            </PunchAddContainer>
            <Dialog open={positiveOpen}>
                <Dialog.Header>
                    <Dialog.Title>
                        {lastPathSegment === 'addpunch' ? 'Send punch?' : 'Update punch?'}
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography group="input" variant="text" token={{ textAlign: 'left' }}>
                        {lastPathSegment === 'addpunch'
                            ? 'Send punch? Request will be sent for further approval and management'
                            : 'Update punch? Punch will be update and be sent for further approval'}
                    </Typography>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <div>
                        <Button variant="ghost" onClick={clearAndClose}>
                            Cancel
                        </Button>
                        <Button type="submit" form="punchForm">
                            {lastPathSegment === 'addpunch' ? 'Send Punch' : 'Update Punch'}
                        </Button>
                    </div>
                </Dialog.Actions>
            </Dialog>
            <NavActionsComponent
                ButtonMessage="Cancel"
                SecondButtonMessage={
                    lastPathSegment === 'addpunch' ? 'Submit punch' : 'Update punch'
                }
                secondButtonColor="primary"
                buttonVariant="outlined"
                secondOnClick={handleOpen}
                onClick={() => {
                    navigate(-1)
                }}
                type="button"
                isShown={true}
            />
        </form>
    )
}
