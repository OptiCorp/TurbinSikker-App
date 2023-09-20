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
import { DefaultNavigation } from '@components/navigation/hooks/DefaultNavigation'
import { useEffect, useState } from 'react'
import { getUploadById, getUploadByPunchId } from '../../Upload'
import useAuth from '../landingPage/context/LandingPageContextProvider'
import { Upload } from '../../types/Upload'

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
    const { accessToken } = useAuth()
    const createdDate = punch && formatDate(punch.createdDate)
    const updatedDate = punch?.updatedDate && formatDate(punch.updatedDate)
    const [uploadData, setUploadData] = useState({
        blobRef: '',
        bytes: '',
        id: '',
        punchId: '',
    })
    const [uploads, setUploads] = useState([])
    const [loading, setLoading] = useState(false)

    function clickHandler(id: string) {
        navigate(`/EditPunch/${id}`)
    }
    function nextImage(index: number) {
        console.log(index)
    }

    useEffect(() => {
        console.log('here', punch?.id)
        const uploads = getUploadByPunchId(punch?.id, accessToken)
        uploads.then((data) => setUploads(data))
    }, [accessToken, punch?.id])
    useEffect(() => {
        setLoading(true)
        const uploadResult = getUploadById('666f2475-189d-418d-a94e-b9eae5893009', accessToken)
        uploadResult.then((data: Upload) => {
            setUploadData({
                blobRef: data.blobRef,
                bytes: data.bytes,
                id: data.id,
                punchId: '',
            })
        })
        setLoading(false)
    }, [accessToken])

    console.log(uploads)

    return (
        <>
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
                                <span style={{ fontWeight: 'bold' }}>modified:</span>
                                {updatedDate}
                            </p>
                        )}
                    </PunchDateContainer>
                </PunchHeader>
            </PunchWrapper>
            {/* <PunchUploadContainer>
                {!loading && uploadData.bytes === '' ? (
                    <span>No uploads</span>
                ) : !loading && uploadData.bytes.length ? (
                    <img src={`data:image/png;base64, ${uploadData.bytes}`} alt="Punch image" />
                ) : (
                    <span>Loading..</span>
                )}
            </PunchUploadContainer> */}
            <PunchUploadContainer>
                <div style={{ display: 'flex', overflowX: 'auto' }}>
                    {uploads?.map((upload: Upload, idx) => (
                        <img
                            onClick={() => nextImage(idx)}
                            src={`data:image/png;base64, ${upload.bytes}`}
                        />
                    ))}
                </div>
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
                {punch && (
                    <PunchButton onClick={() => clickHandler(punch.id)}>Edit Punch</PunchButton>
                )}
            </PunchWrapper>
            <>
                <DefaultNavigation hideNavbar={false} />
            </>
        </>
    )
}

export default Punch
