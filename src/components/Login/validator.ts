import z from 'zod'


export const LoginSchema = z.object({
    password: z.string().min(1, 'Password is required'),
    username: z.string().min(1, 'Username is Required')
})

export type TLoginSchema = z.infer<typeof LoginSchema>;