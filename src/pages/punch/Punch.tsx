import { Icon } from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { formatDate } from '../../Helpers/index'
import { CheckListEntity } from '../context/models/CheckListEntity'
import useAuth from '../landingPage/context/LandingPageContextProvider'
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
import { PunchEntity, PunchSeverity } from './types'

export const punchSeverity: PunchSeverity[] = [
    {
        /* severity: 'Minor', */
        severity: 0,
        color: '#fbca36',
        icon: info_circle,
    },
    {
        /* severity: 'Major', */
        severity: 1,
        color: '#ed8936',
        icon: warning_filled,
    },
    {
        /* severity: 'Critical', */
        severity: 2,
        color: '#eb0000',
        icon: error_filled,
    },
]

function Punch() {
    const navigate = useNavigate()
    const { accessToken } = useAuth()
    const { Punches } = usePunchContext()
    const [punchData, setPunchData] = useState<PunchEntity>()
    const [currentChecklistData, setCurrentChecklistData] =
        useState<CheckListEntity>()
    const createdDate = punchData && formatDate(punchData.createdDate)
    const updatedDate =
        punchData?.updatedDate && formatDate(punchData.updatedDate)
    // console.log('Punches: ', Punches)
    const img = false //temporary, remove when we have an image (upload)

    useEffect(() => {
        getPunch()
    }, [])
    useEffect(() => {
        getChecklist()
    }, [])

    async function getPunch() {
        if (!accessToken) return
        try {
            const response = await fetch(
                'https://turbinsikker-api-lin-prod.azurewebsites.net/api/getPunch?id=57fbf976-bce4-44cc-9da0-53789d6eaf0c',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await response.json()
            setPunchData(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function getChecklist() {
        if (punchData) {
            try {
                const response = await fetch(
                    `https://turbinsikker-api-lin-prod.azurewebsites.net/api/getChecklist?id=${punchData?.checklistWorkflowId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                )
                const data = await response.json()
                setCurrentChecklistData(data)
            } catch (err) {
                console.error((err as Error).message)
            }
        }
    }
    // console.log(punchData?.checklistWorkflowId)
    function clickHandler(id: string) {
        navigate(`/EditPunch/${id}`)
    }

    return (
        <PunchWrapper>
            <PunchHeader>
                <SeverityIconContainer>
                    {punchSeverity.map((severityItem, idx) => {
                        if (punchData?.severity === severityItem.severity) {
                            return (
                                <Icon
                                    key={idx}
                                    data={severityItem.icon}
                                    style={{ color: severityItem.color }}
                                />
                            )
                        }
                    })}

                    <h4>Ticket-{punchData?.id.split('-')[0]}</h4>
                </SeverityIconContainer>
                <PunchDateContainer>
                    <p>{createdDate}</p>
                    {createdDate == updatedDate && (
                        <p style={{ fontSize: '10px' }}>
                            <span style={{ fontWeight: 'bold' }}>
                                modified:{' '}
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
                {!currentChecklistData ? (
                    <p>loading ...</p>
                ) : (
                    <div style={{ display: 'flex', gap: 4 }}>
                        <p>{currentChecklistData?.tasks[0].category.name}</p>
                        <p>
                            {
                                currentChecklistData?.tasks[0].category.id.split(
                                    '-'
                                )[0]
                            }
                        </p>
                    </div>
                )}
                <h4>Description</h4>
                <p>{punchData?.punchDescription}</p>
            </PunchDescriptionContainer>
            {punchData && (
                <PunchButton onClick={() => clickHandler(punchData.id)}>
                    Edit Punch
                </PunchButton>
            )}
        </PunchWrapper>
    )
}

export default Punch
