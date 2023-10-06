import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { SnackbarContext } from '../../components/snackbar/SnackBarContext'
import { API_URL } from '../../config'
import { default as useGlobal } from '../../context/globalContextProvider'
import { Checklist } from '../../services/apiTypes'

export type ListEntity = {
    value: string
    label: string
}

export type ContextType = {
    userIdCheckList: Checklist[]
    allCheckList: Checklist[]
    handleSubmit: (data: { title: string; creatorId: string }) => void

    list: ListEntity[]
    refreshList: boolean
    setRefreshList: React.Dispatch<React.SetStateAction<boolean>>

    checklistById: Checklist[]
}

export const postsContextDefaultValue: ContextType = {
    userIdCheckList: [],
    allCheckList: [],
    handleSubmit: () => {},

    checklistById: [],
    list: [],
    refreshList: false,
    setRefreshList: () => {},
}

const CheckListContext = createContext<ContextType>(postsContextDefaultValue)

const CheckListContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const Location = useLocation()
    const refreshCheckLists = Location.state
        ? Location.state?.refreshCheckLists
        : null
    const [allCheckList, setAllCheckList] = useState<Checklist[]>([])

    const [userIdCheckList, setUserIdCheckList] = useState<Checklist[]>([])
    const [checklistById, setChecklistById] = useState<Checklist[]>([])

    const navigate = useNavigate()
    const [refreshList, setRefreshList] = React.useState<boolean>(false)
    const [list, setList] = useState<ListEntity[]>([])

    const { id } = useParams()
    const { openSnackbar } = useContext(SnackbarContext)
    const { currentUser, accessToken } = useGlobal()

    const getChecklistById = async () => {
        if (!id || !accessToken) return

        const response = await fetch(`${API_URL}/GetChecklist?id=${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        const data = await response.json()

        setChecklistById(data)
    }

    /// fetch checklist
    const fetchCheckLists = async () => {
        if (!accessToken) return
        const res = await fetch(`${API_URL}/GetAllChecklists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })

        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = (await res.json()) as Checklist[]

        setAllCheckList(data)
    }

    useEffect(() => {
        fetchCheckLists()
    }, [refreshCheckLists, accessToken])

    // submitt checklist

    const handleSubmit = async (data: { title: string; creatorId: string }) => {
        if (!accessToken) return
        const res = await fetch(`${API_URL}/AddChecklist`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                title: data.title,
                creatorId: data.creatorId,
            }),
        })

        if (res.ok) {
            const responseJson = await res.json()
            if (responseJson && responseJson.id) {
                const checklistIdd = responseJson.id
                navigate(`/EditCheckList/${checklistIdd}`)
            }
            if (openSnackbar) {
                openSnackbar(`CheckList Created`)
            }
            setRefreshList((prev) => !prev)
        }
    }

    // userIdchecklist

    const memoedValue = useMemo(
        () => ({
            setAllCheckList,
            allCheckList,
            
            
            fetchCheckLists,
            refreshCheckLists,
            setRefreshList,
            refreshList,
            list,
            setList,
            handleSubmit,
            checklistById,
        }),
        [
            setAllCheckList,
            allCheckList,
           
           
            fetchCheckLists,
            setRefreshList,
            refreshCheckLists,
            refreshList,
            list,
            setList,
            handleSubmit,
            checklistById,
        ]
    )

    return (
        // the Provider gives access to the context to its children
        <CheckListContext.Provider value={memoedValue}>
            {children}
        </CheckListContext.Provider>
    )
}

function useCheckListContext() {
    const context = useContext(CheckListContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

export { CheckListContext, CheckListContextProvider, useCheckListContext }
