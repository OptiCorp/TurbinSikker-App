import { Button, Chip, Dialog, Divider, Icon, Table, Typography } from '@equinor/eds-core-react'
import { useNavigate } from 'react-router'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { useHasPermission } from '../../../pages/users/hooks/useHasPermission'
import { PunchListItem, TableWrapper, TextWrapper } from './styles'
import { useEffect, useState } from 'react'
import { Loading } from '../../../components/loading/Loading'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { ApiStatus, PunchItem, Status, User } from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'
import { formatDate, formatTimestamp } from '../../../helpers/dateFormattingHelpers'

function ListPunches() {
    const { currentUser } = useGlobal() as { currentUser: User }
    const api = apiService()
    const { hasPermission } = useHasPermission()
    const navigate = useNavigate()
    const [punches, setPunches] = useState<PunchItem[]>([])
    const [fetchPunchesStatus, setFetchPunchesStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const { isInspector } = useRoles()
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [activePunch, setActivePunch] = useState<PunchItem>()
    useEffect(() => {
        ;(async () => {
            if (isInspector) {
                const punchesFromApi = await api.getPunchInspectorId(currentUser?.id)
                setPunches(punchesFromApi)
                setFetchPunchesStatus(ApiStatus.SUCCESS)
            } else {
                const punchesFromApi = await api.getPunchByLeaderId(currentUser?.id)
                setPunches(punchesFromApi)
                setFetchPunchesStatus(ApiStatus.SUCCESS)
            }
        })()
    }, [currentUser])

    const handleInfoOpen = (punch: PunchItem) => {
        setIsInfoOpen(true)
        setActivePunch(punch)
    }
    const handleInfoClose = () => {
        setIsInfoOpen(false)
    }

    const clickHandler = (punchId: string, workFlowId: string) => {
        navigate(`/workflow/${workFlowId}/punch/${punchId}`)
    }

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

    if (fetchPunchesStatus === ApiStatus.LOADING) {
        return <Loading text="Loading punches .." />
    }

    return (
        <>
            <PunchListItem>
                <TableWrapper>
                    <Table style={{ width: '100%' }}>
                        <Table.Head>
                            <Table.Row>
                                <Table.Cell>Title</Table.Cell>
                                <Table.Cell>Status</Table.Cell>
                                <Table.Cell>Date</Table.Cell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {punches.map((punch, idx) => (
                                <Table.Row key={idx} onClick={() => handleInfoOpen(punch)}>
                                    <Table.Cell>
                                        <TextWrapper>Ticket-{punch.id}</TextWrapper>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {punch.status === 'Pending' && (
                                            <Chip variant="default">{punch.status}</Chip>
                                        )}
                                        {punch.status === 'Approved' && (
                                            <Chip variant="active">{punch.status}</Chip>
                                        )}
                                        {punch.status === 'Rejected' && (
                                            <Chip variant="error">{punch.status}</Chip>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>{formatDate(punch.createdDate)}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </TableWrapper>
            </PunchListItem>
            <Dialog open={isInfoOpen} isDismissable onClose={handleInfoClose}>
                <Dialog.Header>
                    <Dialog.Title>Info</Dialog.Title>
                </Dialog.Header>
                {activePunch && (
                    <Dialog.CustomContent>
                        <Typography variant="body_short">
                            Title: Ticket-{activePunch.id.split('-')[0]}
                        </Typography>
                        <Divider color="medium" size="1" variant="small" />
                        <Typography variant="body_short">Status: {activePunch.status}</Typography>
                        <Divider color="medium" size="1" variant="small" />
                        <Typography variant="body_short">
                            Description: {activePunch.checklistTask.description}
                        </Typography>
                        <Divider color="medium" size="1" variant="small" />
                        <Typography variant="body_short">
                            Date: {formatDate(activePunch.createdDate)}
                            {' / '}
                            {formatTimestamp(activePunch.createdDate)}
                        </Typography>
                    </Dialog.CustomContent>
                )}
                <Dialog.Actions>
                    <Button onClick={() => clickHandler(activePunch!.id, activePunch!.workflowId)}>
                        View
                    </Button>
                    <Button variant="ghost" onClick={handleInfoClose}>
                        Close
                    </Button>
                </Dialog.Actions>
            </Dialog>
            <>
                <DefaultNavigation hideNavbar={false} />
            </>
        </>
    )
}

export default ListPunches
