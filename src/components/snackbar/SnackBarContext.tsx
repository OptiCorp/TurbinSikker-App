import { createContext, useState, ReactNode } from 'react'

export interface SnackbarContextType {
    isOpen: boolean
    snackbarMessage: string
    openSnackbar?: (message: string) => void
    closeSnackbar?: () => void
}

type SnackbarContextProviderProps = {
    children: ReactNode
}

export const SnackbarContext = createContext<SnackbarContextType>({
    isOpen: false,
    snackbarMessage: '',
})

export const SnackbarContextProvider = ({
    children,
}: SnackbarContextProviderProps) => {
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const openSnackbar = (message: string) => {
        setSnackbarMessage(message)
        setIsOpen(true)
    }

    const closeSnackbar = () => {
        setIsOpen(false)
    }

    const contextValue = {
        openSnackbar,
        closeSnackbar,
        snackbarMessage,
        isOpen,
    }

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
        </SnackbarContext.Provider>
    )
}
