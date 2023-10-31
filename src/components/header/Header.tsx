import { Dialog, Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios, menu, notifications } from '@equinor/eds-icons'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { Notifications, Workflow } from '../../services/apiTypes'
import { COLORS } from '../../style/GlobalStyles'
import Sidebar from '../sidebar/Sidebar'
import NotificationList from '../notifications/NotificationList'
import { HeaderContents, HeaderLocation, NewTopBar } from './styles'

export const Header = () => {
    const navigate = useNavigate()
    const [activeUrl, setActiveUrl] = useState<string>('')

    const location = useLocation()
    const [open, setOpen] = useState(false)


    const [read, setRead] = useState(true)
    const [notificationsOpen, setNotificationsOpen] = useState(false)


    useEffect(() => {
        setActiveUrl(window.location.pathname)
        getAllNotifications()
    }, [location])


    const useBasePath = () => {
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
    const [workflow, setWorkFlow] = useState<Workflow | undefined>(undefined)

    const [title, setTitle] = useState('')

    const getAllNotifications = async () => {
        if (currentUser) {
            const notifications = await api.getNotificationsByUser(currentUser.id);
            setRead(notifications.some(notification => notification.notificationStatus === "Unread"))
        }
    }


    useEffect(() => {
        if (!currentUser?.id || !accessToken) return
            ; async (): Promise<void> => {
                try {
                    const workFlowData = await api.getWorkflow(id)

                    setWorkFlow(workFlowData)
                    if (!workFlowData.checklist.checklistTasks) return
                } catch (error) {
                    console.log(error)
                }
            }
    }, [accessToken, currentUser?.id])

    useEffect(() => {
        let pathTitle = ''
        if (location.pathname.includes('FillOutCheckList') && workflow) {
            pathTitle =
                workflow.checklist?.title + ' ' + workflow.id.slice(10, -18) ||
                ''
        } else if (location.pathname === '/AddUser/') {
            pathTitle = location.pathname.slice(1, -1)
        } else {
            pathTitle =
                basePath?.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ||
                basePath ||
                'Checklists'
        }
        setTitle(pathTitle)
    }, [location.pathname, basePath, workflow, workflow?.checklist?.title])

    const onClick = () => {
        navigate(-1)

    }

    return (
        <>
            {' '}
            <Sidebar open={open} setOpen={setOpen} />
            <NotificationList open={notificationsOpen} setOpen={setNotificationsOpen} />
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
                    {read ? (<Icon
                        data={notifications}
                        size={40}
                        style={{
                            color: COLORS.dangerRed
                        }}
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                    />) : (<Icon
                        data={notifications}
                        size={40}
                        style={{
                            color: COLORS.white
                        }}
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                    />)}
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
