import {
  Button,
  Content,
  Flex,
  Heading,
  Provider,
  Text,
  View
} from '@adobe/react-spectrum';
import React from 'react';

export default function CreateRoom() {
  return (
    <View
      marginStart="auto"
      marginEnd="auto"
      maxWidth={1200}
      width="100%"
      minHeight={'100vh'}
      padding={'size-500'}
      paddingTop={'size-1000'}
    >
      <Heading UNSAFE_style={{ textAlign: 'left', color: '#fff' }} level={3}>
        <h3>Create a fight room</h3>
      </Heading>

      <Content>
        <Heading level={3}>
          <h3>Instructions</h3>
        </Heading>
        <ul>
          <li>1 question</li>
          <li>30 minutes time to complete the question</li>
          <li>
            Passing all the test cases correctly first would be declared as
            winner!!
          </li>
          <li>Only host can accept the opponent entry in room</li>
        </ul>
      </Content>

      <Content>
        <Heading level={3}>
          <h3>Features</h3>
        </Heading>
        <ul>
          <li>You can exchange messages in between the dual</li>
          <li>You can start a video call with the opponent</li>
        </ul>
      </Content>

      <Flex justifyContent={'start'} marginTop={'size-500'}>
        <Button variant={'cta'}>Create Room</Button>
      </Flex>
    </View>
  );
}
