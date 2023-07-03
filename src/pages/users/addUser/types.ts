export interface Option {
    value: string
    label: string
}

export type FormValues = {
    firstName: string
    lastName: string
    userRole: { id: string; name: string }
    email: string
    options: Option
    username: string
    status: string
}
