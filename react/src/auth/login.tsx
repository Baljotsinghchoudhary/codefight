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
import authApi from '@app/auth/api/auth-api';
import { LoginProps } from '@app/auth/api/types';
import { useAuth } from '@app/auth/provider/auth-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(128).required()
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

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginProps>({
    resolver: yupResolver(schema)
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { isVerifyingAuth, isAuthenticated, saveAuthTokens } = useAuth();
  const history = useHistory();

  const setTimeBaseClear = (prevErrorMessage: string | undefined) => {
    setTimeout(() => {
      if (prevErrorMessage === errorMessage) {
        setErrorMessage(undefined);
      }
    }, 5000);
  };

  useEffect(() => {
    if (!isVerifyingAuth && isAuthenticated) {
      history.push('/');
    }
  }, [isVerifyingAuth, isAuthenticated]);

  const handleError = (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      return setErrorMessage(
        "Couldn't find any active account with provided credentials, please check the details"
      );
    }
    setErrorMessage('An unknown error occured');
  };

  const login = async (data: LoginProps) => {
    const response = await authApi.login(data);
    if (response.isError) {
      handleError(response.getError());
      return setTimeBaseClear(errorMessage);
    }
    const tokens = response.getValue();
    await saveAuthTokens(tokens.access, tokens.refresh);
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
          <Form onSubmit={handleSubmit(login)}>
            <Heading level={3}>Login</Heading>
            {errorMessage ? (
              <Content UNSAFE_style={{ color: '#c42929' }}>
                {errorMessage}
              </Content>
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
              Login
            </Button>
          </Form>
        </View>
      </Flex>
    </View>
  );
};

export default Login;
