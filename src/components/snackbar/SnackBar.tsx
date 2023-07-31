import { Snackbar, Typography } from '@equinor/eds-core-react'
import { useContext } from 'react'
import { SnackbarContext } from './SnackBarContext'

export const SnackbarComponent = () => {
    const { isOpen, snackbarMessage, closeSnackbar } =
        useContext(SnackbarContext)

    return (
        <Snackbar
            open={isOpen}
            onClose={closeSnackbar}
            autoHideDuration={5000}
            placement="bottom-right"
        >
            {snackbarMessage ? (
                <Typography
                    group="navigation"
                    variant="menu_title"
                    token={{
                        textAlign: 'center',
                        lineHeight: '1em',
                        color: 'white',
                    }}
                >
                    {snackbarMessage}
                </Typography>
            ) : null}{' '}
        </Snackbar>
    )
}

export default Snackbar
