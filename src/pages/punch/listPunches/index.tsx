import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { arrow_forward_ios, assignment_user, file_description, image } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { formatDate, formatTimeStamp } from '../../../Helpers'
import { useHasPermission } from '../../../pages/users/hooks/useHasPermission'
import {
    CreatedByContainer,
    PunchListBoxContainer,
    PunchListItem,
    StatusBadge,
    StatusBadgeContainer,
    TicketActions,
    TicketButtonContainer,
    TicketCardDescription,
    TicketDetails,
    TicketIcons,
    TicketInfo,
} from './styles'
import { useEffect, useState } from 'react'
import { Status } from '../types'
import { PunchItem, User } from '../../../services/apiTypes'
import apiService from '../../../services/api'
import useGlobal from '../../../context/globalContextProvider'

function ListPunches() {
    const { currentUser } = useGlobal() as { currentUser: User }
    const api = apiService()
    const { hasPermission } = useHasPermission()
    const navigate = useNavigate()
    const [punches, setPunches] = useState<PunchItem[]>([])
    const [sorted, setSorted] = useState(false)
    const [showBadge, setShowBadge] = useState(true)
    useEffect(() => {
        ;async () => {
            if (currentUser.userRole.name === 'Inspector') {
                const punchesFromApi = await api.getPunchInspectorId(currentUser?.id)
                setPunches(punchesFromApi)
            } else {
                const punchesFromApi = await api.getPunchByLeaderId(currentUser?.id)
                setPunches(punchesFromApi)
            }
        }
    }, [])

    punches?.sort((a, b) => {
        const dateA = new Date(a.createdDate)
        const dateB = new Date(b.createdDate)

        return dateB.valueOf() - dateA.valueOf()
    })

    punches?.sort((a, b) => {
        if (hasPermission) {
            if (a.status === Status.PENDING && b.status !== Status.PENDING) {
                return -1
            } else if (a.status !== Status.PENDING && b.status === Status.PENDING) {
                return 1
            }
        } else {
            if (a.status === Status.REJECTED && b.status !== Status.REJECTED) {
                return -1
            } else if (a.status !== Status.REJECTED && b.status === Status.REJECTED) {
                return 1
            }
        }
        return 0
    })

    const rejectedPunches = punches?.filter((punch) => punch.status === Status.REJECTED)

    const filteredPunches = sorted
        ? punches?.filter((punch) => punch.status === Status.REJECTED)
        : punches

    function clickHandler(punchId: string, workFlowId: string) {
        navigate(`/workflow/${workFlowId}/punch/${punchId}`)
    }

    return (
        <>
            <PunchListItem>
                {punches && punches?.length < 1 ? (
                    <p>Punches are displayed here..</p>
                ) : (
                    <>
                        {/* <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                background: '#fff',
                                padding: '20px',
                            }}
                        >
                            <div>
                                <input
                                    id="sort"
                                    type="checkbox"
                                    onChange={() => setSorted((prev) => !prev)}
                                />
                                <label htmlFor="sort">Rejected ({rejectedPunches.length})</label>
                            </div>
                            <div>
                                <input
                                    id="show"
                                    type="checkbox"
                                    onChange={() => setShowBadge((prev) => !prev)}
                                />
                                <label htmlFor="show">Hide status badge</label>
                            </div>
                        </div> */}
                        {filteredPunches?.map((punch, idx) => {
                            return (
                                <PunchListBoxContainer
                                    onClick={() => clickHandler(punch.id, punch.workflowId)}
                                    key={idx}
                                >
                                    <StatusBadgeContainer>
                                        {showBadge && (
                                            <StatusBadge status={punch.status}>
                                                {punch.status}
                                            </StatusBadge>
                                        )}
                                    </StatusBadgeContainer>

                                    <TicketInfo>
                                        <TicketDetails>
                                            <Typography>
                                                Ticket-{punch?.id.split('-')[0]}
                                            </Typography>

                                            <TicketCardDescription>
                                                {punch?.checklistTask.description}
                                            </TicketCardDescription>

                                            {hasPermission && (
                                                <>
                                                    <Typography>Created By:</Typography>
                                                    <CreatedByContainer>
                                                        <Icon size={18} data={assignment_user} />
                                                        {punch.user.firstName}
                                                    </CreatedByContainer>
                                                </>
                                            )}
                                        </TicketDetails>
                                    </TicketInfo>

                                    <TicketActions>
                                        <Typography color="disabled">
                                            {formatDate(punch.createdDate)}
                                        </Typography>
                                        <Typography color="disabled">
                                            {formatTimeStamp(punch.createdDate)}
                                        </Typography>
                                        <TicketIcons>
                                            <Icon data={image} />
                                            <Icon data={file_description} />
                                        </TicketIcons>
                                        <TicketButtonContainer>
                                            <Button
                                                style={{ padding: '0' }}
                                                variant="ghost"
                                                color="primary"
                                            >
                                                Details
                                            </Button>
                                            <Icon size={16} data={arrow_forward_ios} />
                                        </TicketButtonContainer>
                                    </TicketActions>
                                </PunchListBoxContainer>
                            )
                        })}
                    </>
                )}
            </PunchListItem>
            <>
                <DefaultNavigation hideNavbar={false} />
            </>
        </>
    )
}

export default ListPunches
