import { Typography, Table, Button, Dialog, Input, Label, Chip, Popover, Icon, Divider} from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { useNavigate, useParams } from 'react-router'
import { formatDate, formatTimestamp } from '../../helpers/dateFormattingHelpers'

import {
    TableWrapper, InvoiceListItem, TextWrapper
} from './styles'
import { useEffect, useState, useRef } from 'react'
import { ApiStatus, PunchItem, Invoice, Workflow } from '../../services/apiTypes'
import apiService from '../../services/api'
import { Loading } from '../../components/loading/Loading'
import { DefaultNavigation } from '../../components/navigation/hooks/DefaultNavigation'

function ListInvoices() {
    const api = apiService()
    const navigate = useNavigate()
    const [invoices, setInvoices] = useState<Invoice[]>()
    const [activeInvoice, setActiveInvoice] = useState<Invoice>()
    const [completedWorkflows, setCompletedWorkflows] = useState<Workflow[]>()
    const [receiver, setReceiver] = useState<string>("")
    const [hourlyRate, setHourlyRate] = useState<number>(0)
    // const createdDate = punch && formatDate(punch.createdDate)
    // const timestamp = punch && formatTimestamp(punch?.createdDate)
    const [fetchPunchStatus, setFetchPunchStatus] = useState<ApiStatus>(ApiStatus.LOADING)

    const [isSendOpen, setIsSendOpen] = useState(false);
        const handleSendOpen = () => {
          setIsSendOpen(true);
        };
        const handleSendClose = () => {
          setIsSendOpen(false);
        };

      const [isStatusOpen, setIsStatusOpen] = useState(false);
      const handleStatusOpen = (invoice: Invoice) => {
        setIsStatusOpen(true);
        setActiveInvoice(invoice);
      };

      const handleStatusClose = () => {
        setIsStatusOpen(false);
      };

      const [isInfoOpen, setIsInfoOpen] = useState(false);
      const handleInfoOpen = (invoice: Invoice) => {
        setIsInfoOpen(true);
        setActiveInvoice(invoice);

      };

      const handleInfoClose = () => {
        setIsInfoOpen(false);
      }

        const getAllInvoices = async () => {
          const invoicesFromApi = await api.getAllInvoices();
          setInvoices(invoicesFromApi);
        }

        const getAllCompletedWorkflows = async () => {
          const workflowsFromApi = await api.getAllCompletedWorkflows();
          setCompletedWorkflows(workflowsFromApi);
        }

        const updateStatus = async (status: string) => {
          await api.updateInvoice(activeInvoice!.id, status);
          await getAllInvoices();
          setIsStatusOpen(false);
        }

        const sendInvoice = async () => {
          const workflowIds =  completedWorkflows!.map((workflow) => workflow.id);
          await api.addInvoice(receiver, workflowIds, hourlyRate);
          setIsSendOpen(false);
          getAllInvoices();
        }

        const handleChangeEmail = async (event: React.FormEvent<HTMLInputElement>) => {
          setReceiver(event.currentTarget.value);
        }

        const handleChangeHourlyRate = async (event: React.FormEvent<HTMLInputElement>) => {
          const hourlyRate = event.currentTarget.value;
          setHourlyRate(parseInt(hourlyRate));
        }
        
    useEffect(() => {
        getAllInvoices();
        getAllCompletedWorkflows();
    }, []);

    return (
        <>
        <InvoiceListItem>
        <TableWrapper>
        <Table style={{width: '100%'}}>
        <Table.Caption>
            <Typography style={{float: 'left', paddingLeft: '10px'}} variant="h2">Invoices</Typography>
        </Table.Caption>
        <Table.Head>
            <Table.Row>
                <Table.Cell>Receiver</Table.Cell>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>
                <Button aria-haspopup="dialog" onClick={handleSendOpen}>
                            Send new invoice
                        </Button>
                </Table.Cell>
            </Table.Row>
        </Table.Head>
        <Table.Body>
            {invoices?.map((invoice, key) => 
                            <Table.Row key={key}>
                            <Table.Cell onClick={() => handleInfoOpen(invoice)}>
                              <TextWrapper>
                              {invoice.receiver}
                              </TextWrapper>
                              </Table.Cell>
                            <Table.Cell onClick={() => handleInfoOpen(invoice)}>

                            {invoice.status == "Paid" ?  (
                                    <Chip variant="active">{invoice.status}</Chip>
                                ) : 
                                    <Chip variant="error">{invoice.status}</Chip>
                                }

                            </Table.Cell>
                            <Table.Cell> 
                            <Button variant='outlined' aria-haspopup="dialog" onClick={() => handleStatusOpen(invoices[key])}>
                            Change status
                        </Button>
                                </Table.Cell>
                            </Table.Row>)}
                            </Table.Body>
                        </Table>
                        </TableWrapper>
                        
          <Dialog open={isStatusOpen} isDismissable onClose={handleStatusClose}>
            <Dialog.CustomContent>
              <Typography variant="body_short">Update the status for this invoice.</Typography>
            </Dialog.CustomContent>
            <Dialog.Actions>
                <Button style={{marginRight: "10px"}} onClick={() => updateStatus("Paid")}>Paid</Button>
                <Button style={{marginRight: "10px"}} color="danger" onClick={() => updateStatus("Unpaid")}>Unpaid</Button>
                <Button onClick={handleStatusClose} variant="ghost">
                  Cancel
                </Button>
            </Dialog.Actions>
          </Dialog>
                       
            <Dialog open={isSendOpen} isDismissable onClose={handleSendClose}>
            <Dialog.Header>
            <Dialog.Title>Send new invoice</Dialog.Title>
          </Dialog.Header>
                <Dialog.CustomContent>
                <div style={{marginBottom: '10px'}}>
                <Label htmlFor="textfield-normal" label="Email" />
                <Input id="textfield-normal" autoComplete="off" onChange={handleChangeEmail}/>
                </div>
                <div>
                <Label htmlFor="textfield-normal" label="Hourly rate" />
                <Input id="textfield-normal" autoComplete="off" onChange={handleChangeHourlyRate} />
                </div>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <Button style={{marginRight: "10px"}} onClick={sendInvoice}>Send</Button>
                    <Button variant="ghost" onClick={handleSendClose}>
                    Cancel
                    </Button>
                </Dialog.Actions>
            </Dialog>

      
      <Dialog open={isInfoOpen} isDismissable onClose={handleInfoClose}>
        <Dialog.Header>
          <Dialog.Title>{activeInvoice?.id}</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography variant="body_short">
            From: {activeInvoice?.sender}
          </Typography>
          <Divider
          color="medium"
          size="1"
          variant="small"
        />
          <Typography variant="body_short">
            To: {activeInvoice?.receiver}
          </Typography>
          <Divider
          color="medium"
          size="1"
          variant="small"
        />
          <Typography variant="body_short">
            Sent: {formatTimestamp(activeInvoice!?.sentDate)} {formatDate(activeInvoice!?.sentDate)}
          </Typography>
          <Divider
          color="medium"
          size="1"
          variant="small"
            />
          <Typography variant="body_short">
            Amount: $ {activeInvoice?.amount}
          </Typography>
          <Divider
          color="medium"
          size="1"
          variant="small"
        />
        <Typography variant="body_short">
            Status {activeInvoice?.status}
          </Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
            <Button onClick={handleInfoClose}>OK</Button>
        </Dialog.Actions>
      </Dialog>




    </InvoiceListItem>
<DefaultNavigation hideNavbar={false}/>
</>

   )
}

export default ListInvoices
