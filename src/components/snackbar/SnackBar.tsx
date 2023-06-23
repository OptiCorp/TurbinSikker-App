import { useContext } from 'react'
import { SnackbarContext } from './SnackBarContext'
import { Snackbar } from '@equinor/eds-core-react'

export const SnackbarComponent = () => {
    const { isOpen, snackbarMessage, closeSnackbar } =
        useContext(SnackbarContext)

    return (
        <Snackbar open={isOpen} onClose={closeSnackbar} autoHideDuration={5000}>
            {snackbarMessage ? <div>{snackbarMessage}</div> : null}{' '}
        </Snackbar>
    )
}

export default Snackbar
