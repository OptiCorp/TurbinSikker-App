import { FunctionComponent, useEffect, useState } from 'react'

import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

import { Checklist, Workflow } from '../../../services/apiTypes'

import apiService from '../../../services/api'
import {
    CellContentMyList,
    MyCheckListCell,
    StyledChip,
    StyledTableRow,
} from './styles'

interface CheckListRowProps {
    checklist: Checklist
    activeRow: boolean
    setActiveRow: (open: boolean) => void
}

export const LeaderMyChecklists: FunctionComponent<CheckListRowProps> = ({
    checklist,
}) => {
    const formatDate = (dateString: string | null) => {
        if (!dateString) {
            return 'No updates'
        }
        const date = new Date(dateString)

        return date.toLocaleDateString('en-GB')
    }
    const [allWorkflows, setAllWorkFlows] = useState<Workflow[]>([])
    const navigate = useNavigate()
    const formattedCreatedDate = formatDate(checklist.createdDate || '')
    const api = apiService()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    useEffect(() => {
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflows()
                setAllWorkFlows(workFlowData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <>
            {checklist?.id && (
                <StyledTableRow
                    onClick={() => clickHandler(checklist.id || '')}
                >
                    <MyCheckListCell>
                        <CellContentMyList>
                            <Typography variant="body_long_bold">
                                {checklist.title}
                            </Typography>

                            <Typography
                                variant="caption"
                                token={{
                                    fontSize: '0.8rem',
                                }}
                                style={{ height: '0px', minWidth: '100px' }}
                            >
                                Created {formattedCreatedDate}
                            </Typography>
                        </CellContentMyList>
                    </MyCheckListCell>
                    <MyCheckListCell>
                        <CellContentMyList>
                            <StyledChip>
                                <Icon
                                    data={assignment_user}
                                    color="#243746"
                                    style={{ height: '15px' }}
                                />
                                <Typography
                                    variant="caption"
                                    token={{
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    0 inspectors
                                </Typography>
                            </StyledChip>
                        </CellContentMyList>
                    </MyCheckListCell>

                    <MyCheckListCell>
                        <CellContentMyList>
                            <Chip variant="active" style={{ margin: '0 auto' }}>
                                {checklist.status}
                            </Chip>
                        </CellContentMyList>
                    </MyCheckListCell>
                </StyledTableRow>
            )}
        </>
    )
}
