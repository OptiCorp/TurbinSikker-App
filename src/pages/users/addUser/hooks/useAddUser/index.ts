import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'
import { FormValues } from './types'
import apiService from '../../../../../services/api'
import { User } from '../../../../../services/apiTypes'

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
        console.log('data: ', data)
        // console.log('submit role id: ', data.userRole.id)

        if (appLocation.pathname === '/AddUser/') {
            await api.addUser({ ...data, azureAdUserId: data.email })

            reset()

            navigate('/ListUsers', { state: { newUser: data.email } })

            // if (openSnackbar) {
            //     openSnackbar('User added successfully!')
            // }
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
            /*  await fetch(`${API_URL}/UpdateUser?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data),
            }) */

            navigate('/ListUsers', { state: { newUser: data.email } })
            // if (openSnackbar) {
            //     openSnackbar('User edited successfully!')
            // }
        }
    }

    return {
        methods,
        onSubmit,
        location: appLocation.pathname,
        user,
    }
}
