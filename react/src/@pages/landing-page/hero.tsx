import '@app/@pages/landing-page/landing-page.css';

import {
  Button,
  Flex,
  Heading,
  Provider,
  Text,
  View
} from '@adobe/react-spectrum';
import PlayCircle from '@spectrum-icons/workflow/PlayCircle';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

function HeroLandingPage(): JSX.Element {
  const animatedSnippet = () => {
    return (
      <motion.div
        animate={{
          scale: [0, 1]
        }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="code-snippet-view"
      >
        <div className="code-snippet">
          <View
            borderWidth="thin"
            borderColor="dark"
            borderRadius="medium"
            width="100%"
            maxWidth="size-5000"
            padding="size-250"
            UNSAFE_className="code-snippet-card "
          >
            <Flex justifyContent="space-between">
              <Button variant="overBackground" isQuiet isDisabled>
                <Text>index.ts</Text>
              </Button>
              <Button variant="cta">
                <Text>Run</Text>
                <PlayCircle />
              </Button>
            </Flex>
            <pre>
              <code className="language-typescript">
                const numbers = {'['}0,1,2,3,4,5,6,7{']'};
                <br />
                <br />
              </code>
              <code className="language-typescript">
                numbers.map{'('}number)={'>'}
                {'{'}
                <br />
                console.log({'{'}number{'}'});
                <br />
                {'}'}
                {')'}
              </code>
            </pre>
          </View>
        </div>
      </motion.div>
    );
  };

  return (
    <View
      marginStart="auto"
      marginEnd="auto"
      maxWidth={1200}
      width="100%"
      minHeight={'60vh'}
      padding={'size-500'}
      paddingTop={'size-1000'}
    >
      <Flex justifyContent="space-between">
        <View padding={'size-100'}>
          <Heading
            level={2}
            marginBottom={0}
            UNSAFE_className={'landing-page-h0'}
          >
            Find worthy opponents
          </Heading>
          <Heading level={2} marginTop={0} UNSAFE_className={'landing-page-h1'}>
            Codefights
          </Heading>
          <Provider scale="large">
            <Link to={'/create-room'}>
              <Button variant="cta">Ready to fight?</Button>
            </Link>
          </Provider>
        </View>
        {animatedSnippet()}
      </Flex>
    </View>
  );
}

export default HeroLandingPage;
