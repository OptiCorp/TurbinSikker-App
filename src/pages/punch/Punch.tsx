import { Icon } from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { formatDate } from '../../Helpers/index'
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
    const { punch } = usePunchContext()
    const createdDate = punch && formatDate(punch.createdDate)
    const updatedDate = punch?.updatedDate && formatDate(punch.updatedDate)

    const img = false //temporary, remove when we have an image (upload)

    function clickHandler(id: string) {
        navigate(`/EditPunch/${id}`)
    }

    return (
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
                    <p>{createdDate}</p>
                    {createdDate == updatedDate && (
                        <p style={{ fontSize: '10px' }}>
                            <span style={{ fontWeight: 'bold' }}>
                                modified:
                            </span>
                            {updatedDate}
                        </p>
                    )}
                </PunchDateContainer>
            </PunchHeader>
            <PunchUploadContainer>
                {!img ? (
                    <span>No Uploads</span>
                ) : (
                    <img src={img} alt="Punch image" />
                )}
                {/*//TODO Change img src w actual img */}
            </PunchUploadContainer>
            <PunchDescriptionContainer>
                <h4>Report name</h4>
                {!punch?.checklistTask ? (
                    <p>loading ...</p>
                ) : (
                    <div style={{ display: 'flex', gap: 4 }}>
                        <p>{punch?.checklistTask.description}</p>
                    </div>
                )}
                <h4>Description</h4>
                <p>{punch?.punchDescription}</p>
            </PunchDescriptionContainer>
            {punch && (
                <PunchButton onClick={() => clickHandler(punch.id)}>
                    Edit Punch
                </PunchButton>
            )}
        </PunchWrapper>
    )
}

export default Punch
