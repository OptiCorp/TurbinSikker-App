import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useLocation, useNavigate } from 'react-router'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import { ListEntity } from 'src/pages/users/context/models/ListEntity'
import useAuth from '../landingPage/context/LandingPageContextProvider'
import { ICheckListUserID } from './models/CheckListUserIdEntity'

export type ContextType = {
    userIdCheckList: ICheckListUserID[]
    allCheckList: CheckListEntity[]
    handleSubmit: (data: { title: string }) => void

    list: ListEntity[]
    refreshList: boolean
    setRefreshList: React.Dispatch<React.SetStateAction<boolean>>
}

export const postsContextDefaultValue: ContextType = {
    userIdCheckList: [],
    allCheckList: [],
    handleSubmit: () => {},

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
    const { state } = useLocation()
    const refreshCheckLists = state ? state?.refreshCheckLists : null
    const [allCheckList, setAllCheckList] = useState<CheckListEntity[]>([])
    const [userIdCheckList, setUserIdCheckList] = useState<ICheckListUserID[]>(
        []
    )
    const navigate = useNavigate()
    const [refreshList, setRefreshList] = React.useState<boolean>(false)
    const [list, setList] = useState<ListEntity[]>([])
    const { idToken } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)

    /// fetch checklist
    const fetchCheckLists = async () => {
        const res = await fetch(
            `http://20.251.37.226:8080/api/GetAllChecklists`
        )
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()

        setAllCheckList(data)
    }

    useEffect(() => {
        fetchCheckLists()
    }, [refreshCheckLists])

    // submitt checklist

    const handleSubmit = async (data: { title: string }) => {
        const res = await fetch(`http://20.251.37.226:8080/api/AddChecklist`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: data.title,
                CreatedBy: '66e88e41-aa49-4bd4-aec4-b08cb553ee95',
            }),
        })

        if (res.ok) {
            const responseJson = await res.json()
            if (responseJson && responseJson.id) {
                const checklistId = responseJson.id
                navigate(`/EditCheckList/${checklistId}`)
            }
            if (openSnackbar) {
                openSnackbar(`CheckList Created`)
            }
            setRefreshList((prev) => !prev)
        }
    }

    // userIdchecklist
    const fetchCheckListUserId = async () => {
        try {
            const res = await fetch(
                `http://20.251.37.226:8080/api/GetAllChecklistsByUserId?id=66e88e41-aa49-4bd4-aec4-b08cb553ee95`
            )
            if (!res.ok) {
                throw new Error('Failed with HTTP code ' + res.status)
            }
            const data = await res.json()
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    useEffect(() => {
        fetchCheckListUserId()
            .then((data) => {
                setUserIdCheckList(data)

                const list = data.map(
                    ({ id, title }: { id: string; title: string }) => ({
                        value: id,
                        label: title,
                    })
                )
                setList(list)
            })
            .catch((error) => {
                console.error(error)
                console.log(setUserIdCheckList)
            })
    }, [refreshList])

    useEffect(() => {
        fetchCheckListUserId()
    }, [refreshCheckLists, refreshList])

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
