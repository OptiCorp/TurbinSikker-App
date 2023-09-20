import { formatDate } from '../../../../Helpers'
import { API_URL } from '../../../../config'
import { WorkFlow } from '../types'
export const getChecklistWorkflowById = async (
    currentUserId: string,
    accessToken: string
) => {
    const res = await fetch(
        `${API_URL}/GetAllWorkflowsByUserId?userId=${currentUserId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }
    )
    if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
    const data = (await res.json()) as WorkFlow[]
    return data.map((item) => ({
        ...item,
        formattedUpdateDate: formatDate(item.updatedDate),
    }))
}
