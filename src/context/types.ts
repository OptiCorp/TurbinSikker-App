import { User } from '../services/apiTypes'

export type AzureUserInfo = {
    preferred_username: string
    name: string
}

export interface GlobalContextType {
    idToken: string
    accessToken: string
    account: any
    accounts: any
    currentUser: User | null
    instance: any
}