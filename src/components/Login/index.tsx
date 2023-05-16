import { Button, Icon, Progress, TextField } from "@equinor/eds-core-react";
import { LoginContainer, BackgroundContainer,TitleHeader, Infotext, Header,Wrapper } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, TLoginSchema } from "./validator";
import { error_filled, } from '@equinor/eds-icons'
import { useState } from "react";
import { Typography } from '@equinor/eds-core-react'







export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const LoginUser = (data: TLoginSchema) => {
    fetch('/api/', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit = () => {
    setIsSubmitting(true)
  }

  return (
    <BackgroundContainer>

      <LoginContainer>
        <Header>  <TitleHeader>Sign in to your 
Account</TitleHeader>
<Typography color="secondary" link href="#" token={{  fontWeight: 600 }} >Or get access here</Typography></Header>
      

        <form onSubmit={handleSubmit(LoginUser)}>
          <TextField
            id="username"
            label="Username"
            {...register("username")}
            placeholder="Username..."
            variant={errors.username && "error"}
            inputIcon={errors.username && <Icon data={error_filled} size={16} />}
            
          />
          <p>{errors.username && errors.username.message}</p>
          <TextField
            {...register("password")}
            type="password"
            label="Password"
            id="textfield-password"
            placeholder="Password..."
            variant={errors.password && "error"}
            inputIcon={errors.password && <Icon data={error_filled} size={16} />}
          />
          <p>{errors.password && errors.password.message}</p>
        
          <Button
           type="submit"
        aria-disabled={isSubmitting ? true : false}
        aria-label={isSubmitting ? 'loading data' : ''}
        onClick={!isSubmitting ? onSubmit : undefined}
      >
        {isSubmitting ? <Progress.Dots color={'primary'} /> : 'Log in'}
      </Button>
      
      




        </form>
   
        <Infotext >Having Trouble with your account?
        <Typography color="secondary" link href="#" token={{  fontWeight: 600 }} 
  >Contact Support</Typography></Infotext>
      </LoginContainer>
    
    </BackgroundContainer>
  );
};