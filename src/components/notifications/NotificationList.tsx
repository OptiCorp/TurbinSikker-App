import { Dialog, List, Table, Typography, Icon } from "@equinor/eds-core-react"
import { FunctionComponent, useEffect, useState } from "react"
import { Notifications } from "../../services/apiTypes"
import { notifications, close } from "@equinor/eds-icons"
import { COLORS } from "../../style/GlobalStyles"
import apiService from "../../services/api"
import useGlobal from "../../context/globalContextProvider"

export type Props = {
    open: boolean
    setOpen: (open: boolean) => void
}


const NotificationList: FunctionComponent<Props> = ({ open, setOpen }) => {

    const client = new WebSocket("wss://pub-sub-test.webpubsub.azure.com/client/hubs/Hub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly9wdWItc3ViLXRlc3Qud2VicHVic3ViLmF6dXJlLmNvbS9jbGllbnQvaHVicy9IdWIiLCJpYXQiOjE2OTg2NjY4MDQsImV4cCI6MTY5ODcyNjgwNH0._SOsGcf3OL7XmCfq3LRuBcKt5pvN5eGminPbbrsm-_o")
    client.onmessage = () => {
        getAllNotifications()
    }

    const api = apiService()

    const { currentUser } = useGlobal()

    const [notificationsList, setNotificationsList] = useState<Notifications[]>()

    const getAllNotifications = async () => {
        if (currentUser) {
            setNotificationsList(await api.getNotificationsByUser(currentUser.id))
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const [activeNotification, setActiveNotification] = useState<Notifications>()

    const [isInfoOpen, setIsInfoOpen] = useState(false)

    const handleNotificationInfoOpen = async (notification: Notifications) => {
        setIsInfoOpen(true)
        setActiveNotification(notification)
        if (notification.notificationStatus === "Unread") {
            await api.updateNotification(notification.id, "Read")
        }
    }

    const closer = () => {
        if (isInfoOpen) {
            setIsInfoOpen(false)
            return
        }
        setOpen(false)
    }

    useEffect(() => {
        getAllNotifications()
    }, [])


    return <>
        <Dialog open={open} onClose={handleClose} style={{ height: '400px' }}>
            <Dialog.Header>
                <Dialog.Title>Notifications</Dialog.Title>
                <Icon
                    data={close}
                    size={40}
                    style={{
                        color: COLORS.black
                    }}
                    onClick={() => closer()}
                />
            </Dialog.Header>
            <Dialog.CustomContent scrollable style={{ height: '100%' }}>

                {!isInfoOpen
                    ?
                    (
                        <center>
                            <Table style={{ width: '100%' }}>
                                <Table.Head>
                                    <Table.Row>
                                        <Table.Cell>Type</Table.Cell>
                                        <Table.Cell>Message</Table.Cell>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body>
                                    {notificationsList?.map((notify, key) =>
                                        (notify.notificationStatus === 'Unread')
                                            ?
                                            (<Table.Row key={key}>
                                                <Table.Cell onClick={() => handleNotificationInfoOpen(notify)}>{notify.notificationType}</Table.Cell>
                                                <Table.Cell onClick={() => handleNotificationInfoOpen(notify)}>{notify.message}</Table.Cell>
                                            </Table.Row>)
                                            :
                                            (<Table.Row style={{ backgroundColor: COLORS.gray }} key={key}>
                                                <Table.Cell onClick={() => handleNotificationInfoOpen(notify)}>{notify.notificationType}</Table.Cell>
                                                <Table.Cell onClick={() => handleNotificationInfoOpen(notify)}>{notify.message}</Table.Cell>
                                            </Table.Row>)

                                    )}
                                </Table.Body>
                            </Table>
                        </center>)
                    :
                    (
                        <Table style={{ width: '100%' }}>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><Typography group="table" variant="cell_header">Type</Typography></Table.Cell>
                                    <Table.Cell>{activeNotification?.notificationType}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><Typography group="table" variant="cell_header">Message</Typography></Table.Cell>
                                    <Table.Cell>{activeNotification?.message}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    )}


            </Dialog.CustomContent>

        </Dialog>
    </>
}

export default NotificationList


