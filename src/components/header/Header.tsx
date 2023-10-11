import { Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios, menu } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { Checklist, Workflow } from '../../services/apiTypes'
import Sidebar from '../sidebar/Sidebar'
import { HeaderContents, HeaderLocation, NewTopBar } from './styles'

export const Header = () => {

    const navigate = useNavigate()
    const appLocation = useLocation()
    const [activeUrl, setActiveUrl] = useState<string>('')

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setActiveUrl(window.location.pathname)
    }, [appLocation])

    const useBasePath = () => {
        const location = useLocation()
        const params = useParams<Record<string, string>>()

        return Object.values(params).reduce(
            (path, param) => path?.replace('/' + param, ''),
            location.pathname.slice(1)
        )
    }

    const { id } = useParams() as { id: string }
    const api = apiService()
    const basePath = useBasePath()
    const { accessToken, currentUser } = useGlobal()
    const [checklist, setChecklist] = useState<Checklist>()
    const [workflows, setWorkFlows] = useState<Workflow[]>([])
    const [title, setTitle] = useState('')
    useEffect(() => {
        if (!currentUser?.id || !accessToken) return
        ;async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflowsByUserId(
                    currentUser.id
                )
                setWorkFlows(workFlowData)
            } catch (error) {
                console.log(error)
            }
        }
    }, [accessToken, currentUser?.id])

    useEffect(() => {
        if (!currentUser?.id || !accessToken) return
        ;async (): Promise<void> => {
            try {
                const checklistData = await api.getChecklist(id)

                setChecklist(checklistData)
                if (!checklistData.checklistTasks) return
            } catch (error) {
                console.log(error)
            }
        }
    }, [accessToken, currentUser?.id])

    useEffect(() => {
        const workflow = workflows?.find(
            (item) => item.checklist.id === checklist?.id
        )
        let pathTitle = ''
        if (location.pathname.includes('FillOutCheckList') && workflow) {
            pathTitle =
                checklist?.title + ' ' + workflow.id.slice(10, -18) || ''
        } else if (location.pathname === '/AddUser/') {
            pathTitle = location.pathname.slice(1, -1)
        } else {
            pathTitle =
                basePath?.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ||
                basePath ||
                'Checklists'
        }
        setTitle(pathTitle)
    }, [location.pathname, basePath, workflows, checklist?.id])

    const onClick = () => {
        // setRefreshList((prev) => !prev)

        navigate(-1)
    }

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
                                color="white"
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
                            color: 'white',
                        }}
                        onClick={() => setOpen(!open)}
                    />
                </TopBar.Actions>
            </NewTopBar>
        </>
    )
}
