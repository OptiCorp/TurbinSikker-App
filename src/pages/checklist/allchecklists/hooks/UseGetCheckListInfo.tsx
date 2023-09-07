import { useEffect, useState } from 'react'
import { formatDate } from '../../../../Helpers'
import { API_URL } from '../../../../config'
import { CheckListEntity } from '../../../context/models/CheckListEntity'
import useAuth from '../../../landingPage/context/LandingPageContextProvider'
import { UserEntity } from '../../../users/context/models/UserEntity'
import { useUserContext } from '../../../users/context/userContextProvider'
import { useWorkflowContext } from '../../workflow/context/workFlowContextProvider'

export const useGetCheckListInfo = (checklistId: string, userId: string) => {
    const { currentUser } = useUserContext()
    const [checklistData, setChecklistData] = useState<CheckListEntity>()
    const { accessToken } = useAuth()
    const [userData, setUserData] = useState<UserEntity | null>(null)
    const { WorkFlows, allWorkFlows } = useWorkflowContext()
    const [name, setName] = useState<string>()
    const [date, setDate] = useState<string>()

    useEffect(() => {
        const fetchChecklistData = async () => {
            if (!accessToken) return
            try {
                const res = await fetch(
                    `${API_URL}/GetChecklist?id=${checklistId}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }
                )
                if (!res.ok) {
                    throw new Error('Failed with HTTP code ' + res.status)
                }
                const data = (await res.json()) as CheckListEntity

                setChecklistData(data)
                setDate(formatDate(data.createdDate))
            } catch (error) {
                console.error('Error fetching checklist data:')
            }
        }

        fetchChecklistData()
    }, [WorkFlows, currentUser, accessToken])

    useEffect(() => {
        const getUserName = async () => {
            if (!accessToken) return
            try {
                const res = await fetch(`${API_URL}/GetUser?id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = (await res.json()) as UserEntity

                setUserData(data)
                setName(data.firstName + ` ` + data.lastName)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        getUserName()
    }, [allWorkFlows, accessToken, userId])
    return {
        checklistData,
        userData,
        name,
        date,
    }
}
