import { Status } from '../services/apiTypes'

export function getStatusBackgroundColor(status: string) {
    if (status === Status.APPROVED) {
        return 'rgba(0, 137, 18, 1)'
    } else if (status === Status.REJECTED) {
        return 'rgba(255, 0, 0, 1)'
    } else {
        return 'rgba(237, 137, 54, 1)'
    }
}
