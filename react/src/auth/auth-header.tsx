import {
  Button,
  ButtonGroup,
  Flex,
  Header,
  Heading,
  View
} from '@adobe/react-spectrum';
import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthHeader() {
  return (
    <Header flex={true} position="static">
      <View
        padding={'size-200'}
        borderBottomColor="magenta-400"
        borderBottomWidth={'thick'}
      >
        <Flex
          maxWidth={1200}
          marginStart="auto"
          marginEnd="auto"
          justifyContent="start"
        >
          <Link to={'/'}>
            <Heading level={2} margin={0}>
              CodeFights
            </Heading>
          </Link>
        </Flex>
      </View>
    </Header>
  );
}
