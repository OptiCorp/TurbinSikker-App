import {
    Autocomplete,
    Button,
    Chip,
    Dialog,
    Divider,
    Input,
    Label,
    Radio,
    Table,
    Typography,
} from '@equinor/eds-core-react'
import { useEffect } from 'react'
import { DefaultNavigation } from '../../components/navigation/hooks/DefaultNavigation'
import {
    formatDate,
    formatTimestamp,
} from '../../helpers/dateFormattingHelpers'
import { useInvoice } from './hooks/useInvoice'
import { InvoiceListItem, TableWrapper, TextWrapper } from './styles'

function ListInvoices() {
    const {
        handleSendOpen,
        invoices,
        handleInfoOpen,
        handleStatusOpen,
        isStatusOpen,
        activeInvoice,
        message,
        handleChangeMessage,
        status,
        onChangeStatus,
        updateStatus,
        handleStatusClose,
        isSendOpen,
        handleSendClose,
        handleChangeTitle,
        handleChangeEmail,
        handleChangeHourlyRate,
        completedWorkflows,
        selectedWorkflows,
        sendInvoice,
        downloadPDF,
        onChangeOptions,
        isInfoOpen,
        handleInfoClose,
        getAllCompletedWorkflows,
        getAllInvoices,
    } = useInvoice()

    useEffect(() => {
        getAllInvoices()
        getAllCompletedWorkflows()
    }, [])

    return (
        <>
            <InvoiceListItem>
                <TableWrapper>
                    <Table style={{ width: '100%' }}>
                        <Table.Caption>
                            <Typography
                                style={{ float: 'left', paddingLeft: '10px' }}
                                variant="h2"
                            >
                                Invoices
                            </Typography>
                        </Table.Caption>
                        <Table.Head>
                            <Table.Row>
                                <Table.Cell>#</Table.Cell>
                                <Table.Cell>Title</Table.Cell>
                                <Table.Cell>Status</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        aria-haspopup="dialog"
                                        onClick={handleSendOpen}
                                    >
                                        New invoice
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {invoices?.map((invoice, key) => (
                                <Table.Row key={key}>
                                    <Table.Cell
                                        onClick={() => handleInfoOpen(invoice)}
                                    >
                                        {invoice.number}
                                    </Table.Cell>
                                    <Table.Cell
                                        onClick={() => handleInfoOpen(invoice)}
                                    >
                                        <TextWrapper>
                                            {invoice.title}
                                        </TextWrapper>
                                    </Table.Cell>

                                    <Table.Cell
                                        onClick={() => handleInfoOpen(invoice)}
                                    >
                                        {invoice.status == 'Paid' ? (
                                            <Chip variant="active">
                                                {invoice.status}
                                            </Chip>
                                        ) : (
                                            <Chip variant="error">
                                                {invoice.status}
                                            </Chip>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            variant="outlined"
                                            aria-haspopup="dialog"
                                            onClick={() =>
                                                handleStatusOpen(invoices[key])
                                            }
                                        >
                                            Change status
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </TableWrapper>

                <Dialog
                    open={isStatusOpen}
                    isDismissable
                    onClose={handleStatusClose}
                >
                    <Dialog.Header>
                        <Dialog.Title>
                            Change status for #{activeInvoice?.number}
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Actions>
                        <div style={{ marginBottom: '10px' }}>
                            <Label htmlFor="textfield-normal" label="Message" />
                            <Input
                                id="textfield-normal"
                                autoComplete="off"
                                value={message}
                                onChange={handleChangeMessage}
                            />
                        </div>
                        <div>
                            <Radio
                                label="Paid"
                                name="group"
                                value="Paid"
                                checked={status === 'Paid'}
                                onChange={onChangeStatus}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <Radio
                                label="Unpaid"
                                name="group"
                                value="Unpaid"
                                checked={status === 'Unpaid'}
                                onChange={onChangeStatus}
                            />
                        </div>
                        <Button
                            style={{ marginRight: '10px' }}
                            onClick={() => updateStatus()}
                        >
                            Confirm
                        </Button>
                        <Button onClick={handleStatusClose} variant="ghost">
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog
                    open={isSendOpen}
                    isDismissable
                    onClose={handleSendClose}
                >
                    <Dialog.Header>
                        <Dialog.Title>Send new invoice</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CustomContent>
                        <div style={{ marginBottom: '10px' }}>
                            <Label htmlFor="textfield-normal" label="Title" />
                            <Input
                                id="textfield-normal"
                                autoComplete="off"
                                onChange={handleChangeTitle}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <Label htmlFor="textfield-normal" label="Email" />
                            <Input
                                id="textfield-normal"
                                autoComplete="off"
                                onChange={handleChangeEmail}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <Label
                                htmlFor="textfield-normal"
                                label="Hourly rate ($)"
                            />
                            <Input
                                id="textfield-normal"
                                autoComplete="off"
                                onChange={handleChangeHourlyRate}
                            />
                        </div>
                        <Autocomplete
                            label=""
                            options={
                                completedWorkflows?.filter(
                                    (x) => !!x.completionTimeMinutes
                                ) || []
                            }
                            selectedOptions={selectedWorkflows}
                            optionLabel={(option) => option.checklist.title}
                            onOptionsChange={({ selectedItems }) => {
                                onChangeOptions(selectedItems)
                            }}
                            multiple
                        />
                    </Dialog.CustomContent>
                    <Dialog.Actions>
                        <Button
                            style={{ marginRight: '10px' }}
                            onClick={sendInvoice}
                        >
                            Send
                        </Button>
                        <Button variant="ghost" onClick={handleSendClose}>
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog
                    open={isInfoOpen}
                    isDismissable
                    onClose={handleInfoClose}
                >
                    <Dialog.Header>
                        <Dialog.Title>Info</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CustomContent>
                        <Typography variant="body_short">
                            Title: {activeInvoice?.title}
                        </Typography>
                        <Divider color="medium" size="1" variant="small" />
                        <Typography variant="body_short">
                            From: {activeInvoice?.sender}
                        </Typography>
                        <Divider color="medium" size="1" variant="small" />
                        <Typography variant="body_short">
                            To: {activeInvoice?.receiver}
                        </Typography>
                        <Divider color="medium" size="1" variant="small" />
                        <Typography variant="body_short">
                            Sent: {formatTimestamp(activeInvoice!?.sentDate)}{' '}
                            {formatDate(activeInvoice!?.sentDate)}
                        </Typography>
                        <Divider color="medium" size="1" variant="small" />
                        <Typography variant="body_short">
                            Amount: $ {activeInvoice?.amount}
                        </Typography>
                        <Divider color="medium" size="1" variant="small" />
                        <Typography variant="body_short">
                            Status: {activeInvoice?.status}
                        </Typography>
                        <Divider color="medium" size="1" variant="small" />
                        {activeInvoice?.message ? (
                            <>
                                <Typography variant="body_short">
                                    Message: {activeInvoice?.message}
                                </Typography>
                                <Divider
                                    color="medium"
                                    size="1"
                                    variant="small"
                                />
                            </>
                        ) : (
                            <></>
                        )}
                        <Typography variant="body_short">
                            <a
                                href="javascript:void(0);"
                                target="_blank"
                                onClick={downloadPDF}
                            >
                                Download PDF
                            </a>
                        </Typography>
                    </Dialog.CustomContent>
                    <Dialog.Actions>
                        <Button onClick={handleInfoClose}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </InvoiceListItem>
            <DefaultNavigation hideNavbar={false} />
        </>
    )
}

export default ListInvoices
