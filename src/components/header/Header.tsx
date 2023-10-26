import { Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios, menu } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { Checklist, Workflow } from '../../services/apiTypes'
import { COLORS } from '../../style/GlobalStyles'
import Sidebar from '../sidebar/Sidebar'
import { HeaderContents, HeaderLocation, NewTopBar } from './styles'

export const Header = () => {
    const navigate = useNavigate()
    const [activeUrl, setActiveUrl] = useState<string>('')
    const [checklist, setChecklist] = useState<Checklist>()
    const location = useLocation()
    const [open, setOpen] = useState(false)

    const api = apiService()

    const { accessToken, currentUser } = useGlobal()
    const [workflow, setWorkFlow] = useState<Workflow>()

    const [title, setTitle] = useState('')
    useEffect(() => {
        setActiveUrl(window.location.pathname)
    }, [location])

    const useBasePath = () => {
        const params = useParams<Record<string, string>>()

        return Object.values(params).reduce(
            (path, param) => path?.replace('/' + param, ''),
            location.pathname.slice(1)
        )
    }
    const basePath = useBasePath()
    const { id, workflowId, taskId, punchId } = useParams() as {
        id: string
        taskId: string
        workflowId: string
        punchId: string
    }
    useEffect(() => {
        if (!workflow && !checklist && id && currentUser?.id) {
            ;(async () => {
             
                try {
                    const checklistData = await api.getChecklist(id)
                    setChecklist(checklistData)
                } catch (error) {
                    console.log(error)
                }
            })()
        } else {
            ;(async () => {
                if (workflowId)
                    try {
                        const workFlowData = await api.getWorkflow(workflowId)
                        setWorkFlow(workFlowData)
                    } catch (error) {
                        console.log(error)
                        console.log('test')
                    }
            })()
        }
    }, [currentUser?.id, id, workflowId])

    useEffect(() => {
        let pathTitle = ''

        if (location.pathname.includes('FillOutCheckList')) {
            pathTitle =
                workflow?.checklist.title + ' ' + workflow?.id.slice(10, -18) ||
                ''
        } else if (location.pathname === '/AddUser/') {
            pathTitle = location.pathname.slice(1, -1)
        } else if (location.pathname.includes('PreviewCheckList')) {
            pathTitle = checklist?.title || ''
        } else if (location.pathname.includes('EditCheckList')) {
            pathTitle = 'Edit' + ' ' + checklist?.title || ''
        }
    else if (location.pathname === '/SendCheckList/' ){
        pathTitle = 'Send checklist' || ''
    }
    else if (location.pathname === `/SendChecklist/${id}` ){
        pathTitle = 'Send' + ' ' + checklist?.title|| ''
    } else if (
            location.pathname === `/workflow/${workflowId}/punch/${punchId}`
        ) {
            pathTitle =
                (workflow?.checklist.title || '') +
                ' ' +
                ' Ticket ' +
                punchId.slice(0, -28)
        } else {
            pathTitle =
                basePath?.match(/[A-Z][a-z]+|[0-9]+/g)?.join('') ||
                basePath ||
                'Checklists'
        }
        setTitle(pathTitle)
    }, [location.pathname, basePath, workflow, checklist])

    const onClick = () => {
        navigate(-1)
    }

    console.log(location.pathname)

    return (
        <>
            {' '}
            <Sidebar open={open} setOpen={setOpen} />
            <NewTopBar>
                <TopBar.Header>
                    {activeUrl === '/' ? null : (
                        <HeaderContents>
                            <Icon
                                data={arrow_back_ios}
                                color={COLORS.white}
                                onClick={onClick}
                            />
                        </HeaderContents>
                    )}
                </TopBar.Header>
                <TopBar.CustomContent>
                    <HeaderLocation>{title}</HeaderLocation>
                </TopBar.CustomContent>
                <TopBar.Actions>
                    <Icon
                        data={menu}
                        size={40}
                        style={{
                            color: COLORS.white,
                        }}
                        onClick={() => setOpen(!open)}
                    />
                </TopBar.Actions>
            </NewTopBar>
        </>
    )
}
