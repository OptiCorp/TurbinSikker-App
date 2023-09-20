import { API_URL } from '../config'

async function getUploadById(id: string, accessToken: string) {
    if (!accessToken) return
    const response = await fetch(`https://localhost:7290/api/GetUpload?id=${id}`, {
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

async function AddUpload(accessToken: string, punchId: string | undefined, file: File | undefined) {
    if (!accessToken) return

    const formData = new FormData()

    formData.append('punchId', punchId || '58ba8ff3-01a3-4fd3-8bff-13bc5173155d')
    formData.append('file', file || '')
    await fetch(`https://localhost:7290/api/AddUpload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*',
        },
        body: formData,
    })
}

export { getUploadByPunchId, getUploadById, AddUpload }
