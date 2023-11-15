import { Chip, Table } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { BannerComponent } from '../../../components/banner/useBanner'
import { Loading } from '../../../components/loading/Loading'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import useGlobal from '../../../context/globalContextProvider'
import { formatDate } from '../../../helpers/dateFormattingHelpers'
import apiService from '../../../services/api'
import { ApiStatus, PunchItem, Status, User } from '../../../services/apiTypes'
import { useHasPermission } from '../../../services/useHasPermission'
import { useRoles } from '../../../services/useRoles'
import { PunchListItem, TableWrapper, TextWrapper } from './styles'

function ListPunches() {
    const { currentUser } = useGlobal() as { currentUser: User }
    const api = apiService()
    const { hasPermission } = useHasPermission()
    const navigate = useNavigate()
    const [punches, setPunches] = useState<PunchItem[]>([])
    const [fetchPunchesStatus, setFetchPunchesStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    )
    const { isInspector } = useRoles()

    useEffect(() => {
        ;(async () => {
            if (isInspector) {
                const punchesFromApi = await api.getPunchInspectorId(
                    currentUser?.id
                )
                setPunches(punchesFromApi)
                setFetchPunchesStatus(ApiStatus.SUCCESS)
            } else {
                const punchesFromApi = await api.getPunchByLeaderId(
                    currentUser?.id
                )
                setPunches(punchesFromApi)
                setFetchPunchesStatus(ApiStatus.SUCCESS)
            }
        })()
    }, [currentUser])

    const navigateToClickedPunch = (punchId: string, workFlowId: string) => {
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
            } else if (
                a.status !== Status.PENDING &&
                b.status === Status.PENDING
            ) {
                return 1
            }
        } else {
            if (a.status === Status.REJECTED && b.status !== Status.REJECTED) {
                return -1
            } else if (
                a.status !== Status.REJECTED &&
                b.status === Status.REJECTED
            ) {
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
                <BannerComponent />
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
                                <Table.Row
                                    key={idx}
                                    onClick={() =>
                                        navigateToClickedPunch(
                                            punch.id,
                                            punch.workflowId
                                        )
                                    }
                                >
                                    <Table.Cell>
                                        <TextWrapper>
                                            Ticket-{punch.id}
                                        </TextWrapper>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {punch.status === 'Pending' && (
                                            <Chip variant="default">
                                                {punch.status}
                                            </Chip>
                                        )}
                                        {punch.status === 'Approved' && (
                                            <Chip variant="active">
                                                {punch.status}
                                            </Chip>
                                        )}
                                        {punch.status === 'Rejected' && (
                                            <Chip variant="error">
                                                {punch.status}
                                            </Chip>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {formatDate(punch.createdDate)}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </TableWrapper>
            </PunchListItem>

            <>
                <DefaultNavigation hideNavbar={false} />
            </>
        </>
    )
}

export default ListPunches
