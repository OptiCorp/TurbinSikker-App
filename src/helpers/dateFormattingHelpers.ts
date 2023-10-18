export function formatDate(dateString: string | '') {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-GB')
}

export function formatTimestamp(timeStamp: string) {
    const date = new Date(timeStamp)
    const amOrPm = date.getHours() < 12 ? 'AM' : 'PM'
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')} ${amOrPm}`
}
