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

const HeaderComponent = () => {
  return (
    <>
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
            justifyContent="space-between"
          >
            <Link to={'/'}>
              <Heading level={2} margin={0}>
                CodeFights
              </Heading>
            </Link>

            <ButtonGroup>
              <Link to={'/'} style={{ marginRight: '20px' }}>
                <Button variant="primary">Why codefights?</Button>
              </Link>
              <div />
              <Link to={'/auth/login'}>
                <Button variant="cta">Login/Signup</Button>
              </Link>
            </ButtonGroup>
          </Flex>
        </View>
      </Header>
    </>
  );
};

export default HeaderComponent;
