import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'
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
    const [user, setUser] = useState<User>()

    useEffect(() => {
        if (!user) return
        reset(user)
    }, [user])

    useEffect(() => {
        ;(async () => {
            const userFromApi = await api.getUser(id)
            setUser(userFromApi)
        })()
    }, [])
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (appLocation.pathname === '/AddUser/') {
            await api.addUser({ ...data, azureAdUserId: data.email })

            reset()

            navigate('/ListUsers', { state: { newUser: data.email } })
        } else {
            await api.updateUser(
                id,
                data.username,
                data.firstName,
                data.lastName,
                data.email,
                data.userRoleId,
                data.status
            )

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
