import { Dialog, Table, Typography, Icon } from "@equinor/eds-core-react"
import { FunctionComponent, useState } from "react"
import { Notifications } from "../../services/apiTypes"
import { close } from "@equinor/eds-icons"
import { COLORS } from "../../style/GlobalStyles"
import apiService from "../../services/api"

export type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    getAllNotificationsParent: () => void
    notificationsList: Notifications[]
}


const NotificationList: FunctionComponent<Props> = ({ open, setOpen, getAllNotificationsParent, notificationsList }) => {
    const api = apiService()



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
            getAllNotificationsParent()
        }
    }

    const closer = () => {
        setIsInfoOpen(false)
        setOpen(false)
    }



    return <>
        <Dialog open={open} onClose={handleClose} style={{ height: '400px' }}>
            <Dialog.Header>
                <Dialog.Title>Notifications</Dialog.Title>
                <Icon
                    data={close}
                    size={24}
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
                        <Table style={{ width: '100%' }}>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Cell>Type</Table.Cell>
                                    <Table.Cell>Message</Table.Cell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {notificationsList.map((notify, key) =>
                                ((
                                    <Table.Row style={{ backgroundColor: notify.notificationStatus === 'Unread' ? 'rgb(165, 223, 255)' : undefined }} key={key}>
                                        <Table.Cell onClick={async () => await handleNotificationInfoOpen(notify)}>{notify.notificationType}</Table.Cell>
                                        <Table.Cell onClick={async () => await handleNotificationInfoOpen(notify)}>{notify.message}</Table.Cell>
                                    </Table.Row>
                                )))}
                            </Table.Body>
                        </Table>)
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
