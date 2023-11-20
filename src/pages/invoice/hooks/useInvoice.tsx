import { useEffect, useState } from 'react'

import apiService from '../../../services/api'
import { Invoice, WorkflowResponse } from '../../../services/apiTypes'
import { default as useGlobal } from './../../../context/globalContextProvider'

export const useInvoice = () => {
    const [invoices, setInvoices] = useState<Invoice[]>()
    const [activeInvoice, setActiveInvoice] = useState<Invoice>()
    const [completedWorkflows, setCompletedWorkflows] =
        useState<WorkflowResponse[]>()
    const [receiver, setReceiver] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [hourlyRate, setHourlyRate] = useState<number>(0)
    const [message, setMessage] = useState<string>('')
    const { currentUser } = useGlobal()

    const [isSendOpen, setIsSendOpen] = useState(false)
    const handleSendOpen = () => {
        setIsSendOpen(true)
    }
    const handleSendClose = () => {
        setIsSendOpen(false)
        setSelectedWorkflows([])
    }

    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const handleStatusOpen = (invoice: Invoice) => {
        setIsStatusOpen(true)
        setStatus(invoice.status)
        setActiveInvoice(invoice)
        setMessage(invoice.message)
    }

    const handleStatusClose = () => {
        setIsStatusOpen(false)
        setStatus('')
    }

    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const handleInfoOpen = (invoice: Invoice) => {
        setIsInfoOpen(true)
        setActiveInvoice(invoice)
    }

    const handleInfoClose = () => {
        setIsInfoOpen(false)
    }

    const getAllInvoices = async () => {
        const invoicesFromApi = await api.getAllInvoices()
        setInvoices(invoicesFromApi)
    }

    const getAllCompletedWorkflows = async () => {
        const workflowsFromApi = await api.getAllCompletedWorkflows()
        setCompletedWorkflows(workflowsFromApi)
    }

    const updateStatus = async () => {
        await api.updateInvoice(activeInvoice!.id, status!, message)
        await getAllInvoices()
        setIsStatusOpen(false)
        setStatus('')
    }

    const sendInvoice = async () => {
        if (currentUser) {
            await api.addInvoice(
                title,
                receiver,
                selectedWorkflows.map((x) => x.id),
                hourlyRate,
                currentUser.id
            )
        }

        handleSendClose()
        getAllInvoices()
    }

    const handleChangeEmail = async (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        setReceiver(event.currentTarget.value)
    }

    const handleChangeTitle = async (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeHourlyRate = async (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        const hourlyRate = event.currentTarget.value
        setHourlyRate(parseInt(hourlyRate))
    }

    const handleChangeMessage = async (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        setMessage(event.currentTarget.value)
    }

    const [selectedWorkflows, setSelectedWorkflows] = useState<
        WorkflowResponse[]
    >([])

    const onChangeOptions = (changes: WorkflowResponse[]) => {
        setSelectedWorkflows(changes)
    }

    const [status, setStatus] = useState<string>()
    const onChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    const downloadPDF = async () => {
        const invoice = await api.getInvoicePdfByInvoiceId(activeInvoice!?.id)
        const linkSource = `data:application/pdf;base64,${invoice.pdf}`
        const downloadLink = document.createElement('a')
        const fileName = 'invoice.pdf'
        downloadLink.href = linkSource
        downloadLink.download = fileName
        downloadLink.click()
    }

    useEffect(() => {
        getAllInvoices()
        getAllCompletedWorkflows()
    }, [])

    const api = apiService()

    return {
        completedWorkflows,
        setCompletedWorkflows,
        handleSendOpen,
        downloadPDF,
        status,
        setStatus,
        onChangeStatus,
        onChangeOptions,
        setSelectedWorkflows,
        selectedWorkflows,
        activeInvoice,
        setActiveInvoice,
        getAllInvoices,
        getAllCompletedWorkflows,
        handleChangeHourlyRate,
        handleChangeEmail,
        handleChangeMessage,
        handleChangeTitle,
        sendInvoice,
        updateStatus,
        handleInfoClose,
        isInfoOpen,
        setIsInfoOpen,
        handleInfoOpen,
        handleStatusOpen,
        handleStatusClose,
        isStatusOpen,
        setIsStatusOpen,
        setIsSendOpen,
        isSendOpen,
        setInvoices,
        invoices,
        handleSendClose,
        message,
    }
}
