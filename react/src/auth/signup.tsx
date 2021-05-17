import {
  Button,
  Checkbox,
  Content,
  Flex,
  Form,
  Heading,
  TextField,
  View
} from '@adobe/react-spectrum';
import { mapObjectToKv } from '@app/@code-fights/core/map-object-to-kv';
import authApi from '@app/auth/api/auth-api';
import { SignupProps } from '@app/auth/api/types';
import { useAuth } from '@app/auth/provider/auth-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(128).required(),
  username: yup.string().min(3).max(255).required(),
  firstName: yup.string().min(1).max(255).required(),
  lastName: yup.string().min(1).max(255).required()
});

interface FormErrorProps {
  errors: any;
  name: string;
}

const FormError: FC<FormErrorProps> = ({ errors, name }) => {
  return errors[name] ? (
    <Content UNSAFE_style={{ color: '#c42929' }}>
      {errors[name].message}
    </Content>
  ) : (
    <></>
  );
};

const Signup = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<SignupProps>({
    resolver: yupResolver(schema)
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  const { isVerifyingAuth, isAuthenticated, saveAuthTokens } = useAuth();
  const history = useHistory();

  const setTimeBaseClear = (prevErrorMessage: string | undefined) => {
    setTimeout(() => {
      if (prevErrorMessage === errorMessage) {
        setErrorMessage(undefined);
      }
    }, 2000);
  };

  useEffect(() => {
    if (!isVerifyingAuth && isAuthenticated) {
      history.push('/');
    }
  }, [isVerifyingAuth, isAuthenticated]);

  const handleError = (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 400) {
        return mapObjectToKv(
          error.response.data,
          (
            key: 'email' | 'password' | 'username' | 'firstName' | 'lastName',
            value: string[]
          ) => {
            setError(key, { message: value[0] });
          }
        );
      }
    } else {
      setErrorMessage('An unknown error occured');
    }
  };

  const signup = async (data: SignupProps) => {
    clearErrors();
    const response = await authApi.signup(data);
    console.log({ response });
    if (response.isError) {
      handleError(response.getError());
      return setTimeBaseClear(errorMessage);
    }
    setRegisterSuccess(true);
  };

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit(signup)}>
        <Heading level={3}>Signup</Heading>
        {errorMessage ? (
          <Content UNSAFE_style={{ color: '#c42929' }}>{errorMessage}</Content>
        ) : (
          <></>
        )}
        <Controller
          control={control}
          render={({ field }) => (
            <TextField
              label="Email"
              name={field.name}
              id={field.name}
              value={field.value}
              onChange={value => field.onChange(value)}
              validationState={errors.email ? 'invalid' : 'valid'}
            />
          )}
          name="email"
        />
        <FormError errors={errors} name={'email'} />

        <Controller
          control={control}
          render={({ field }) => (
            <TextField
              label="Username"
              name={field.name}
              id={field.name}
              value={field.value}
              onChange={value => field.onChange(value)}
              validationState={errors.username ? 'invalid' : 'valid'}
            />
          )}
          name="username"
        />
        <FormError errors={errors} name={'username'} />

        <Controller
          control={control}
          render={({ field }) => (
            <TextField
              label="First name"
              name={field.name}
              id={field.name}
              value={field.value}
              onChange={value => field.onChange(value)}
              validationState={errors.firstName ? 'invalid' : 'valid'}
            />
          )}
          name="firstName"
        />
        <FormError errors={errors} name={'firstName'} />

        <Controller
          control={control}
          render={({ field }) => (
            <TextField
              label="LastName"
              name={field.name}
              id={field.name}
              value={field.value}
              onChange={value => field.onChange(value)}
              validationState={errors.lastName ? 'invalid' : 'valid'}
            />
          )}
          name="lastName"
        />
        <FormError errors={errors} name={'lastName'} />

        <Controller
          control={control}
          render={({ field }) => (
            <TextField
              label="Password"
              name={field.name}
              id={field.name}
              value={field.value}
              onChange={value => field.onChange(value)}
              validationState={errors.password ? 'invalid' : 'valid'}
            />
          )}
          name="password"
        />
        <FormError errors={errors} name={'password'} />
        <Button
          type="submit"
          maxWidth="size-1600"
          marginTop="size-250"
          flexShrink={1}
          variant="primary"
          isDisabled={isSubmitting}
        >
          Signup
        </Button>
      </Form>
    );
  };

  const SuccessView = () => {
    return (
      <>
        <Heading level={3}>
          A verification email have been sent to {getValues('email')}
        </Heading>
        <Heading level={4}>
          Please verify email by opening the link in the email
        </Heading>
        <Heading level={5}>
          <Link style={{ color: '#11309a' }} to={'/auth/login'}>
            Return to login
          </Link>
        </Heading>
      </>
    );
  };

  return (
    <View
      marginStart="auto"
      marginEnd="auto"
      paddingTop="10vh"
      maxWidth={1200}
      width="100%"
    >
      <Flex
        minHeight="90vh"
        justifyContent="center"
        alignContent="start"
        alignItems="start"
      >
        <View
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          width="100%"
          maxWidth="size-5000"
          padding="size-250"
        >
          {registerSuccess ? <SuccessView /> : renderForm()}
        </View>
      </Flex>
    </View>
  );
};

export default Signup;
