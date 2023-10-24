import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { User } from '../../../services/apiTypes'
import { FormValues } from './types'

export const useAddUser = () => {
    const api = apiService()

    const navigate = useNavigate()
    const appLocation = useLocation()
    const methods = useForm<FormValues>()
    const { reset } = methods
    const { id } = useParams() as { id: string }
    const [users, setUsers] = useState<User[]>([])
    const user = users.find((x) => x.id === id)
    const { openSnackbar } = useGlobal()
    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    useEffect(() => {
        ;(async () => {
            const usersFromApi = await api.getAllUsersAdmin()
            setUsers(usersFromApi)
        })()
    }, [])

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (appLocation.pathname === '/AddUser/') {
            const res = await api.addUser({
                ...data,
                azureAdUserId: data.email,
            })

            reset()
            if (res.ok && openSnackbar) openSnackbar('User added')
            navigate('/ListUsers', { state: { newUser: data.email } })
        } else {
            const res = await api.updateUser(
                id,
                data.username,
                data.firstName,
                data.lastName,
                data.email,
                data.userRoleId,
                data.status
            )
            if (res.ok && openSnackbar) openSnackbar('User updated')
            navigate('/ListUsers', { state: { newUser: data.email } })
        }
    }

    return {
        methods,
        onSubmit,
        location: appLocation.pathname,
        user,
    }
}
