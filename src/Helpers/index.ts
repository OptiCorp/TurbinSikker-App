import { Status } from '../pages/punch/types'

export function formatDate(dateString: string | '') {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-GB')
}

export function formatTimeStamp(timeStamp: string) {
    const date = new Date(timeStamp)
    const amOrPm = date.getHours() < 12 ? 'AM' : 'PM'
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')} ${amOrPm}`
}

export function getStatusBackgroundColor(status: string) {
    switch (status) {
        case Status.APPROVED:
            return 'rgba(0, 137, 18, 1)'
        case Status.REJECTED:
            return 'rgba(255, 0, 0, 1)'
        default:
            return 'rgba(237, 137, 54, 1)'
    }
}
