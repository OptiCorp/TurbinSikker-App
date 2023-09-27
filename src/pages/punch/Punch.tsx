import { DefaultNavigation } from '@components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { Button, CircularProgress, Dialog, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user, error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { formatDate } from '../../Helpers/index'
import { Upload } from '../../types/Upload'
import { useHasPermission } from '../users/hooks/useHasPermission'
import { usePunch } from './PunchHook'
import { usePunchContext } from './context/PunchContextProvider'
import {
    PunchButton,
    PunchDateContainer,
    PunchDescriptionContainer,
    PunchHeader,
    PunchUploadContainer,
    PunchWrapper,
    SeverityIconContainer,
} from './styles'
import { PunchSeverity } from './types'

export const punchSeverity: PunchSeverity[] = [
    {
        severity: 'Minor',
        color: '#fbca36',
        icon: info_circle,
    },
    {
        severity: 'Major',
        color: '#ed8936',
        icon: warning_filled,
    },
    {
        severity: 'Critical',
        color: '#eb0000',
        icon: error_filled,
    },
]

function Punch() {
    const navigate = useNavigate()
    const {
        setStatus,
        onSubmit,
        positiveOpen,
        clearAndClose,
        handleOpen,
        uploads,
        loading,
        methods,
    } = usePunch()
    const { punch } = usePunchContext()
    const createdDate = punch && formatDate(punch.createdDate)
    const updatedDate = punch?.updatedDate && formatDate(punch.updatedDate)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const { hasPermission } = useHasPermission()

    const { handleSubmit } = methods

    function clickHandler(id: string) {
        navigate(`/EditPunch/${id}`)
    }
    function nextImage() {
        if (uploads.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % uploads.length)
        }
    }

    return (
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <PunchWrapper>
                <PunchHeader>
                    <SeverityIconContainer>
                        {punchSeverity.map((severityItem, idx) => {
                            if (punch?.severity === severityItem.severity) {
                                return (
                                    <Icon
                                        key={idx}
                                        data={severityItem.icon}
                                        style={{ color: severityItem.color }}
                                    />
                                )
                            }
                        })}

                        <h4>Ticket-{punch?.id.split('-')[0]}</h4>
                    </SeverityIconContainer>
                    <PunchDateContainer>
                        {hasPermission && (
                            <div>
                                <p>Created by</p>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        background: '#C5C5C594',
                                        color: '#000',
                                        boxShadow: '1px 1px 0px 0px #9d9d9d inset',
                                    }}
                                >
                                    <Icon size={18} data={assignment_user} />

                                    <p>{punch?.user.firstName}</p>
                                </div>
                            </div>
                        )}
                        <p>{createdDate}</p>
                        {createdDate == updatedDate && (
                            <p style={{ fontSize: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>modified:</span>
                                {updatedDate}
                            </p>
                        )}
                    </PunchDateContainer>
                </PunchHeader>
            </PunchWrapper>

            <PunchUploadContainer>
                {loading && <CircularProgress />}
                <div style={{ display: 'flex', overflowX: 'auto' }}>
                    {uploads?.map((upload: Upload, idx) => {
                        return (
                            /* idx === currentImageIndex && ( */
                            <img key={idx} src={`data:image/png;base64, ${upload.bytes}`} />
                            /*  ) */
                        )
                    })}
                </div>
                {/* <button onClick={nextImage}> {'>'} </button> */}
            </PunchUploadContainer>
            <PunchWrapper style={{ marginBottom: '48px' }}>
                <PunchDescriptionContainer>
                    <h4>Report name</h4>
                    {!punch?.checklistTask ? (
                        <p>loading ...</p>
                    ) : (
                        <div>
                            <p>{punch?.checklistTask.description}</p>
                        </div>
                    )}
                    <h4>Description</h4>
                    <p>{punch?.description}</p>
                </PunchDescriptionContainer>
                {!hasPermission && punch && (
                    <PunchButton onClick={() => clickHandler(punch.id)}>Edit Punch</PunchButton>
                )}
            </PunchWrapper>

            <Dialog open={positiveOpen}>
                <Dialog.Header>
                    <Dialog.Title>Approve Punch?</Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography group="input" variant="text" token={{ textAlign: 'left' }}>
                        Request will be approved, sent and marked for further management
                    </Typography>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <div>
                        <Button variant="ghost" onClick={clearAndClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setStatus('Approved')
                                navigate(-1)
                            }}
                            type="submit"
                            form="form"
                        >
                            OK
                        </Button>
                    </div>
                </Dialog.Actions>
            </Dialog>

            {punch?.status === 'Pending' && hasPermission ? (
                <NavActionsComponent
                    ButtonMessage="Reject"
                    SecondButtonMessage={'Approve'}
                    secondButtonColor="primary"
                    buttonVariant="outlined"
                    buttonColor="danger"
                    secondOnClick={handleOpen}
                    onClick={() => {
                        setStatus('Rejected')
                    }}
                    type="button"
                    primaryType="submit"
                    isShown={true}
                />
            ) : (
                <>
                    <DefaultNavigation hideNavbar={false} />
                </>
            )}
        </form>
    )
}

export default Punch
