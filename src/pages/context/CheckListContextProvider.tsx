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
import { useUserContext } from '../users/context/userContextProvider'
import { ICheckListUserID } from './models/CheckListUserIdEntity'

export type ContextType = {
    userIdCheckList: ICheckListUserID[]
    allCheckList: CheckListEntity[]
    handleSubmit: (data: { title: string; CreatedBy: string }) => void

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
    const { idToken, accessToken } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)
    const { currentUser } = useUserContext()
    
    /// fetch checklist
    const fetchCheckLists = async () => {
        const res = await fetch(`https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetAllChecklists`,
        {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": '*'
            }})
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()

        setAllCheckList(data)
    }

    useEffect(() => {
        fetchCheckLists()
    }, [refreshCheckLists])

    // submitt checklist

    const handleSubmit = async (data: { title: string; CreatedBy: string }) => {
        const res = await fetch(`https://turbinsikker-api-lin-prod.azurewebsites.net/api/AddChecklist`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify({
                title: data.title,
                CreatedBy: data.CreatedBy,
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
        try {
            const res = await fetch(
                `https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetAllChecklistsByUserId?id=${currentUser?.id}`,
                {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": '*'
                    }}
            )
            if (!res.ok) {
                throw new Error('Failed with HTTP code ' + res.status)
            }
            const data = (await res.json()) as ICheckListUserID[]
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
    }, [refreshList, currentUser])

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