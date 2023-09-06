import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { Button, Icon, TextField, Typography } from '@equinor/eds-core-react'
import { close, file_description, image, upload } from '@equinor/eds-icons'
import React, {
    ChangeEvent,
    FunctionComponent,
    SetStateAction,
    useState,
} from 'react'
import { useLocation, useParams } from 'react-router'
import { API_URL } from '../../../config'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import SeverityButton from '../severityButton/SeverityButton'
import {
    PunchAddContainer,
    PunchAddUploadContainer,
    PunchForm,
    PunchUploadButtonContainer,
    PunchUploadFileContainer,
    PunchUploadFilesContainer,
    SeverityButtonWrapper,
} from '../styles'
export const AddPunch: FunctionComponent = () => {
    const [severity, setSeverity] = useState<SetStateAction<string>>('Minor')
    const [formValue, setFormValue] = useState({
        reportName: '',
        Description: '',
    })
    const [uploads, setUploads] = useState(false)
    const { idToken } = useAuth()
    const { id } = useParams()
    const { currentUser } = useUserContext()
    const appLocation = useLocation()

    console.log('Current user: ', currentUser ? currentUser : '')
    async function postPunch() {
        await fetch(`${API_URL}/AddPunch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                createdBy: currentUser?.id,
                punchDescription: formValue.Description,
                severity: severity,
                checklistId: '6dc7a320-6dad-4d38-9984-bcd2a90d8bd6',
            }),
        })
    }

    async function onSubmit(e: React.FormEvent, data) {
        console.log(data)
        e.preventDefault()
        if (appLocation.pathname === '/AddPunch') {
            await postPunch()
        } else {
            await fetch(`${API_URL}/UpdatePunch?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        }
    }

    return (
        <>
            <PunchAddContainer>
                <PunchAddUploadContainer>
                    <PunchUploadButtonContainer>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '.7px dotted #73B1B5',
                                borderRadius: '4px',
                            }}
                        >
                            <Icon data={upload} size={48} />
                        </div>
                        <Button>Upload</Button>
                    </PunchUploadButtonContainer>

                    {!uploads ? (
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
                                        <Icon
                                            color="#73B1B5"
                                            data={file_description}
                                        />
                                        <Typography variant="caption">
                                            file-name.txt
                                        </Typography>
                                    </div>
                                </div>
                                <Icon data={close} color="#243746" size={16} />
                            </PunchUploadFileContainer>

                            <PunchUploadFileContainer
                                onClick={() => setUploads((prev) => !prev)}
                            >
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
                                            image-name.jpg
                                        </Typography>
                                    </div>
                                </div>
                                <Icon data={close} color="#243746" size={16} />
                            </PunchUploadFileContainer>
                        </PunchUploadFilesContainer>
                    )}
                </PunchAddUploadContainer>
                <TextField
                    id=""
                    label="Description"
                    multiline
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValue({
                            ...formValue,
                            Description: e.target.value,
                        })
                    }
                />
                <PunchForm
                    onSubmit={(e) =>
                        onSubmit(e, {
                            checklistWorkflowId:
                                '652a4343-8c1b-4dbc-93a0-ca5a990b81ca',
                            punchDescription: formValue.Description,
                            severity: severity,
                            status: 'Pending',
                        })
                    }
                >
                    <Typography variant="h6">Severity</Typography>
                    <SeverityButtonWrapper>
                        <SeverityButton
                            severity={severity}
                            setSeverity={setSeverity}
                        />
                    </SeverityButtonWrapper>
                    <button type="submit">submit</button>
                </PunchForm>
            </PunchAddContainer>

            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                <PunchAddUploadContainer>
                    <PunchUploadButtonContainer>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '.7px dotted #73B1B5',
                                borderRadius: '4px',
                            }}
                        >
                            <Icon data={upload} size={48} />
                        </div>
                        <Button>Upload</Button>
                    </PunchUploadButtonContainer>

                    {!uploads ? (
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
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        color="#73B1B5"
                                        data={file_description}
                                    />
                                    <Typography variant="caption">
                                        file-name.txt
                                    </Typography>
                                </div>
                                <Icon data={close} color="#243746" size={16} />
                            </PunchUploadFileContainer>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: '1px solid #DEEDEE',
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
                                        image-name.jpg
                                    </Typography>
                                </div>
                                <Icon data={close} color="#243746" size={16} />
                            </div>
                        </PunchUploadFilesContainer>
                    )}
                </PunchAddUploadContainer>
                <InfoHeader>
                    <StyledCard
                        style={{
                            width: '100%',
                        }}
                    >
                        <TextField
                            id=""
                            label="Description"
                            multiline
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setFormValue({
                                    ...formValue,
                                    Description: e.target.value,
                                })
                            }
                        />
                    </StyledCard>
                </InfoHeader>
                <PunchForm
                    onSubmit={(e) =>
                        onSubmit(e, {
                            checklistWorkflowId:
                                '652a4343-8c1b-4dbc-93a0-ca5a990b81ca',
                            punchDescription: formValue.Description,
                            severity: severity,
                            status: 'Pending',
                        })
                    }
                >
                    <Typography variant="h6">Severity</Typography>
                    <SeverityButtonWrapper>
                        <SeverityButton
                            severity={severity}
                            setSeverity={setSeverity}
                        />
                    </SeverityButtonWrapper>
                    <button type="submit">submit</button>
                </PunchForm>
            </div> */}
            <NavActionsComponent
                ButtonMessage="Cancel"
                SecondButtonMessage="Submit"
                secondButtonColor="primary"
                buttonVariant="outlined"
                isShown={true}
            />
        </>
    )
}
