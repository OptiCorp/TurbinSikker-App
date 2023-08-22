import { useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'
import { SnackbarContext } from '../../../../../components/snackbar/SnackBarContext'
import useAuth from '../../../../landingPage/context/LandingPageContextProvider'
import { UserContext } from '../../../context/userContextProvider'
import { FormValues } from './types'

export const useAddUser = () => {
    const { idToken } = useAuth()
    const navigate = useNavigate()
    const appLocation = useLocation()
    const methods = useForm<FormValues>()
    const { reset } = methods
    const { id } = useParams()
    const { result: users } = useContext(UserContext)
    const user = users.find((x) => x.id === id)
    const { openSnackbar } = useContext(SnackbarContext)

    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (appLocation.pathname === '/AddUser/') {
            await fetch('https://localhost:7290/api/AddUser', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, azureAdUserId: data.email }),
            })

            reset()

            navigate('/ListUsers', { state: { newUser: data.email } })

            if (openSnackbar) {
                openSnackbar('User added successfully!')
            }
        } else {
            await fetch(`https://localhost:7290/api/UpdateUser?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            navigate('/ListUsers', { state: { newUser: data.email } })
            if (openSnackbar) {
                openSnackbar('User edited successfully!')
            }
        }
    }

    return {
        methods,
        onSubmit,
        location: appLocation.pathname,
        user,
    }
}
