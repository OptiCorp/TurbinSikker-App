import { Snackbar, Typography } from '@equinor/eds-core-react'
import useGlobal from '../../context/globalContextProvider'

export type SnackbarProps = {
    showSnackbar: boolean
    setShowSnackBar: (showSnackbar: boolean) => void
    snackbarText: string
    setSnackbarText: (snackbarText: string) => void
}

export const SnackBarComponent = () => {
    const { isOpen, snackbarText, closeSnackbar } = useGlobal()

    return (
        <Snackbar
            style={{ top: '80%', height: '40px' }}
            autoHideDuration={3000}
            onClose={() => {
                closeSnackbar
            }}
            open={isOpen}
        >
            <Typography
                group="navigation"
                variant="menu_title"
                token={{
                    textAlign: 'center',
                    lineHeight: '1em',
                    color: 'white',
                }}
            >
                {' '}
                {snackbarText}
            </Typography>
        </Snackbar>
    )
}
