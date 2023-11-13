import { User } from '../services/apiTypes'

export type AzureUserInfo = {
    preferred_username: string
    name: string
    oid: string
}

export interface GlobalContextType {
    idToken: string
    accessToken: string
    account: any
    accounts: any
    currentUser: User | null
    instance: any
    isOpen: boolean
    snackbarText: string
    openSnackbar?: (message: string) => void
    closeSnackbar?: () => void
    refreshList: boolean
    setRefreshList: React.Dispatch<React.SetStateAction<boolean>>
    pubSubToken: string
}
