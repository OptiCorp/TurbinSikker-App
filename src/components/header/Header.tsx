import { Dialog, Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios, menu, notifications } from '@equinor/eds-icons'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { Notifications, Checklist, Workflow } from '../../services/apiTypes'
import { useRoles } from '../../services/useRoles'
import { COLORS } from '../../style/GlobalStyles'
import Sidebar from '../sidebar/Sidebar'
import NotificationList from '../notifications/NotificationList'
import { HeaderContents, HeaderLocation, NewTopBar } from './styles'
import { WebPubSubClient } from '@azure/web-pubsub-client'
import { Badge } from '../badge'

export const Header = () => {
    const navigate = useNavigate()
    const [activeUrl, setActiveUrl] = useState('')
    const [checklist, setChecklist] = useState<Checklist>()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const { isInspector, isLeader } = useRoles()
    const api = apiService()
    const [numberOfUnreads, setNumberOfUnreads] = useState(0)
    const [notificationsOpen, setNotificationsOpen] = useState(false)

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

    const { currentUser, pubSubToken, openSnackbar } = useGlobal()
    const [workflow, setWorkFlow] = useState<Workflow | undefined>(undefined)

    const [title, setTitle] = useState('')

    const [notificationsList, setNotificationsList] = useState<Notifications[]>([])

    const getAllNotifications = async () => {
        if (currentUser) {
            const notifications = await api.getNotificationsByUser(currentUser.id);
            const unreadNotifications = notifications.filter((notification) => notification.notificationStatus === "Unread")
            setNotificationsList(notifications)
            setNumberOfUnreads(unreadNotifications.length)

        }
    }

    useEffect(() => {
        console.log("token: " + pubSubToken)
        const pubSubClient = new WebPubSubClient(pubSubToken)

        pubSubClient?.on("server-message", (e) => {
            if (currentUser) {
                if (e.message.data === currentUser.id) {
                    getAllNotifications()
                    if (openSnackbar) openSnackbar("Invoicing failed")
                }
            }
        })

        pubSubClient?.start()

        if (currentUser) {
            (async () => {
                // const notifications = await api.getNotificationsByUser(currentUser.id);
                // setNotificationsList(notifications)
                // setRead(notifications.some(notification => notification.notificationStatus === "Unread"))
                await getAllNotifications()
            })()
        }
        return () => {
            pubSubClient?.off("server-message", () => { })
            pubSubClient?.stop()
        }
    }, [])


    const { id, workflowId, taskId, punchId } = useParams() as {
        id: string
        taskId: string
        workflowId: string
        punchId: string
    }
    useEffect(() => {
        if (!workflow && !checklist && id && currentUser?.id) {
            (async () => {
                try {
                    const checklistData = await api.getChecklist(id)
                    setChecklist(checklistData)
                } catch (error) {
                    console.log(error)
                }
            })()
        } else {
            (async () => {
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
            pathTitle = 'Add user'
        } else if (location.pathname === '/ListUsers/') {
            pathTitle = 'List of users'
        } else if (location.pathname.includes('PreviewCheckList')) {
            pathTitle = checklist?.title || ''
        } else if (location.pathname.includes('ForReviewChecklists')) {
            pathTitle = 'For review'
        } else if (location.pathname.includes('EditCheckList')) {
            pathTitle = 'Edit' + ' ' + checklist?.title || ''
        } else if (location.pathname === '/SendCheckList/') {
            pathTitle = 'Send checklist' || ''
        } else if (location.pathname === `/SendChecklist/${id}`) {
            pathTitle = 'Send' + ' ' + checklist?.title || ''
        } else if (
            location.pathname === `/workflow/${workflowId}/punch/${punchId}`
        ) {
            pathTitle =
                (workflow?.checklist.title || '') +
                ' ' +
                ' Punch ' +
                punchId.slice(0, -28)
        } else if (location.pathname.includes(workflowId && taskId)) {
            pathTitle = 'Create punch'
        } else if (location.pathname.includes('Checklists')) {
            pathTitle = `${isLeader ? 'Checklists in progress' : 'Outgoing checklists'
                }`
        } else if (location.pathname.includes('MyCheckLists')) {
            pathTitle = `${isLeader ? 'Checklists templates' : 'Incomming checklists'
                }`
        } else {
            pathTitle =
                basePath?.match(/[A-Z][a-z]+|[0-9]+/g)?.join('') ||
                basePath ||
                ''
        }
        setTitle(pathTitle)
    }, [location.pathname, basePath, workflow, checklist])

    const onClick = () => {
        navigate(-1)
    }


    return (
        <>
            {' '}
            <Sidebar open={open} setOpen={setOpen} />
            <NotificationList open={notificationsOpen} setOpen={setNotificationsOpen} getAllNotificationsParent={getAllNotifications} notificationsList={notificationsList} />
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
                    <Badge value={numberOfUnreads} color={"red"}>
                        <Icon data={notifications}
                            size={32}
                            style={{
                                color: COLORS.white
                            }}
                            onClick={() => setNotificationsOpen(!notificationsOpen)} />
                    </Badge>
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
