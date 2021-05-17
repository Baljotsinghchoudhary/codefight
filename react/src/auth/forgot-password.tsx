import {
  Button,
  Flex,
  Form,
  Heading,
  TextField,
  View
} from '@adobe/react-spectrum';
import React from 'react';

export default function ForgotPassword(): JSX.Element {
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
          <Form width="100%">
            <Heading level={3}>Forgot password</Heading>
            <TextField label="Email" />
            <Button
              type="submit"
              maxWidth="size-2000"
              marginTop="size-250"
              flexShrink={1}
              variant="primary"
            >
              Send help email
            </Button>
          </Form>
        </View>
      </Flex>
    </View>
  );
}
