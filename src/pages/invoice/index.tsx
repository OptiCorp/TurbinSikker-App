import { Typography, Table, Button, Dialog, Input, Label, Chip, Popover, Icon} from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { useNavigate, useParams } from 'react-router'
import { formatDate, formatTimestamp } from '../../Helpers/dateFormattingHelpers'

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
    const [activeInvoiceId, setActiveInvoiceId] = useState<string>("")
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
      
      const handleStatusOpen = (invoiceId: string) => {
        setIsStatusOpen(true);
        setActiveInvoiceId(invoiceId);

      };
      const handleStatusClose = () => {
        setIsStatusOpen(false);
      };

        const getAllInvoices = async () => {
          const invoicesFromApi = await api.getAllInvoices();
          setInvoices(invoicesFromApi);
        }

        const getAllCompletedWorkflows = async () => {
          const workflowsFromApi = await api.getAllCompletedWorkflows();
          setCompletedWorkflows(workflowsFromApi);
        }

        const updateStatus = async (status: string) => {
          await api.updateInvoice(activeInvoiceId, status);
          await getAllInvoices();
          setIsStatusOpen(false);
        }

        const sendInvoice = async () => {
          const workflowIds =  completedWorkflows!.map((workflow) => workflow.id);
          await api.addInvoice(receiver, workflowIds, hourlyRate);
          setIsSendOpen(false);
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
                            <Table.Row>
                            <Table.Cell key={key} >
                              <TextWrapper>
                              {invoice.receiver}
                              </TextWrapper>
                              </Table.Cell>
                            <Table.Cell key={key} >

                            {invoice.status == "Paid" ?  (
                                    <Chip variant="active">{invoice.status}</Chip>
                                ) : 
                                    <Chip variant="error">{invoice.status}</Chip>
                                }

                            </Table.Cell>
                            <Table.Cell key={key}> 
                            <Button variant='outlined' aria-haspopup="dialog" onClick={() => handleStatusOpen(invoices[key].id)}>
                            Change status
                        </Button>
                                </Table.Cell>
                            </Table.Row>)}
                            </Table.Body>
                        </Table>
                        </TableWrapper>
                        
          <Dialog open={isStatusOpen}>
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
                       
            <Dialog open={isSendOpen}>
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
    </InvoiceListItem>
<DefaultNavigation hideNavbar={false}/>
</>

   )
}

export default ListInvoices
