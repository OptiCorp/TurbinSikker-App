import { API_URL } from '../config'

async function getUploadById(id: string, accessToken: string) {
    if (!accessToken) return
    const response = await fetch(`${API_URL}/GetUpload?id=${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })

    const data = await response.json()

    return data
}

async function getUploadByPunchId(id: string, accessToken: string) {
    if (!accessToken) return
    if (!id) return
    const response = await fetch(`${API_URL}/GetUploadsByPunchId?punchId=${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })

    const data = await response.json()

    return data
}

async function addUpload(accessToken: string, punchId: string | undefined, file: File | undefined) {
    if (!accessToken) return

    const formData = new FormData()

    formData.append('punchId', punchId || '')
    formData.append('file', file || '')
    await fetch(`${API_URL}/AddUpload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*',
        },
        body: formData,
    })
}

export { getUploadByPunchId, getUploadById, addUpload }
