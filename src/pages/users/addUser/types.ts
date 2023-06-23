export interface Option {
    value: string
    label: string
}

export type FormValues = {
    firstName: string
    lastName: string
    userRoleId: string
    email: string
    options: Option
    username: string
}
