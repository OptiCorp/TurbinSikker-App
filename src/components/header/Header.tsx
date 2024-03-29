import { Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios, menu, notifications } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'

import {
    Checklist,
    Notifications,
    WorkflowResponse,
} from '../../services/apiTypes'

import { WebPubSubClient } from '@azure/web-pubsub-client'
import { useRoles } from '../../services/useRoles'
import { COLORS } from '../../style/GlobalStyles'
import { Badge } from '../badge'
import NotificationList from '../notifications/NotificationList'
import Sidebar from '../sidebar/Sidebar'
import { HeaderContents, HeaderLocation, NewTopBar } from './styles'

export const Header = () => {
    const navigate = useNavigate()
    const [activeUrl, setActiveUrl] = useState('')
    const [checklist, setChecklist] = useState<Checklist>()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const { isLeader } = useRoles()
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
    const [workflow, setWorkFlow] = useState<WorkflowResponse | undefined>(
        undefined
    )

    const [title, setTitle] = useState('')

    const [notificationsList, setNotificationsList] = useState<Notifications[]>(
        []
    )
    const [badgeColor, setBadgeColor] = useState('orange')

    const getAllNotifications = async () => {
        if (currentUser) {
            const notifications = await api.getNotificationsByUser(
                currentUser.id
            )
            const unreadNotifications = notifications.filter(
                (notification) => notification.notificationStatus === 'Unread'
            )
            if (
                unreadNotifications.some(
                    (notification) =>
                        notification.notificationType.toLowerCase() === 'error'
                )
            ) {
                setBadgeColor('red')
            } else {
                setBadgeColor('orange')
            }
            setNotificationsList(notifications)
            setNumberOfUnreads(unreadNotifications.length)
        }
    }

    useEffect(() => {
        const pubSubClient = new WebPubSubClient(pubSubToken)

        pubSubClient?.on('server-message', (e) => {
            if (currentUser) {
                var notificationType = e.message.data.toString().split(' ')[0]
                var reveiverId = e.message.data.toString().split(' ')[1]
                if (reveiverId === currentUser.id) {
                    getAllNotifications()
                    if (notificationType === 'error') {
                        if (openSnackbar) openSnackbar('Invoice failed')
                    } else {
                        if (openSnackbar) openSnackbar('Invoice sent')
                    }
                }
            }
        })

        pubSubClient?.start()

        if (currentUser) {
            ;(async () => {
                await getAllNotifications()
            })()
        }
        return () => {
            pubSubClient?.off('server-message', () => {})
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
        if (!currentUser?.id || !id) return
        if (!workflow) {
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
                   
                    }
            })()
        }
    }, [currentUser?.id, workflowId, id])

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
        } else if (
            location.pathname.includes('PreviewCheckList') &&
            checklist
        ) {
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
            pathTitle = `${
                isLeader ? 'Checklists in progress' : 'Outgoing checklists'
            }`
        } else if (location.pathname.includes('MyCheckLists')) {
            pathTitle = `${
                isLeader ? 'Checklists templates' : 'Incomming checklists'
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
            <Sidebar open={open} setOpen={setOpen} />
            <NotificationList
                open={notificationsOpen}
                setOpen={setNotificationsOpen}
                getAllNotificationsParent={getAllNotifications}
                notificationsList={notificationsList}
            />
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
                    <Badge value={numberOfUnreads} color={badgeColor}>
                        <Icon
                            data={notifications}
                            size={32}
                            style={{
                                color: COLORS.white,
                            }}
                            onClick={() =>
                                setNotificationsOpen(!notificationsOpen)
                            }
                        />
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
