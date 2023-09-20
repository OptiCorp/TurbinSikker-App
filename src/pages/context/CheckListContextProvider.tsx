import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import { ListEntity } from 'src/pages/users/context/models/ListEntity'
import { API_URL } from '../../config'
import useAuth from '../landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../users/context/userContextProvider'
import { ICheckListUserID } from './models/CheckListUserIdEntity'

export type ContextType = {
    userIdCheckList: ICheckListUserID[]
    allCheckList: CheckListEntity[]
    handleSubmit: (data: { title: string; creatorId: string }) => void

    list: ListEntity[]
    refreshList: boolean
    setRefreshList: React.Dispatch<React.SetStateAction<boolean>>
    checklistById: Checklist
}

type Checklist = {
    id: string
    createdDate: string
    status: string
    title: string
    updateDate: string
    checklistTasks: [
        {
            description: string
            categoryId: string
            id: string
            category: {
                id: string
                name: string
            }
        },
    ]
}

export const postsContextDefaultValue: ContextType = {
    userIdCheckList: [],
    allCheckList: [],
    handleSubmit: () => {},

    checklistById: {
        id: '',
        createdDate: '',
        status: '',
        title: '',
        updateDate: '',
        checklistTasks: [
            {
                category: {
                    id: '',
                    name: '',
                },
                categoryId: '',
                description: '',
                id: '',
            },
        ],
    },
    list: [],
    refreshList: false,
    setRefreshList: () => {},
}

const CheckListContext = createContext<ContextType>(postsContextDefaultValue)

const CheckListContextProvider = ({ children }: { children: React.ReactNode }) => {
    const Location = useLocation()
    const refreshCheckLists = Location.state ? Location.state?.refreshCheckLists : null
    const [allCheckList, setAllCheckList] = useState<CheckListEntity[]>([])
    const [userIdCheckList, setUserIdCheckList] = useState<ICheckListUserID[]>([])
    const [checklistById, setChecklistById] = useState<Checklist>()
    const navigate = useNavigate()
    const [refreshList, setRefreshList] = React.useState<boolean>(false)
    const [list, setList] = useState<ListEntity[]>([])
    const { accessToken } = useAuth()
    const { id } = useParams()
    const { openSnackbar } = useContext(SnackbarContext)
    const { currentUser } = useUserContext()

    const getChecklistById = async () => {
        if (!id) return
        if (!accessToken) return
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
        const data = await res.json()

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
    const fetchCheckListUserId = async () => {
        if (!currentUser?.id || !accessToken) return
        try {
            const res = await fetch(`${API_URL}/GetAllChecklistsByUserId?id=${currentUser?.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            if (!res.ok) {
                throw new Error('Failed with HTTP code ' + res.status)
            }
            const data = (await res.json()) as ICheckListUserID[]
            setUserIdCheckList(data)
            const list = data.map(({ id, title }: { id: string; title: string }) => ({
                value: id,
                label: title,
            }))
            setList(list)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    useEffect(() => {
        getChecklistById()
    }, [accessToken])

    useEffect(() => {
        fetchCheckListUserId()
    }, [refreshList, currentUser, accessToken])

    const memoedValue = useMemo(
        () => ({
            setAllCheckList,
            allCheckList,
            userIdCheckList,
            setUserIdCheckList,
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
            userIdCheckList,
            setUserIdCheckList,
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
        <CheckListContext.Provider value={memoedValue}>{children}</CheckListContext.Provider>
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
