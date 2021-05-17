import '@app/@pages/landing-page/landing-page.css';
import {
    Flex,
    View,
    Heading,
    Content
} from '@adobe/react-spectrum';
import React from 'react';

function SectionOneLandingPage(): JSX.Element {

    return (
        <View
            marginStart="auto"
            marginEnd="auto"
            maxWidth={1200}
            width="100%"
            minHeight={'60vh'}
            paddingTop={'size-1000'}
        >
            <Flex justifyContent="space-between" direction="column">
                <Heading level={1}>What is Codefights?</Heading>
                <Content maxWidth={800}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi ullam soluta autem omnis, molestias officiis, quis voluptates est iste mollitia quam ipsam iure corrupti, nemo maiores magnam dignissimos itaque fugit illo harum quas? Facere nihil corporis, voluptates eos aliquid impedit minus quam dolore nisi magnam ratione magni molestias tempora perspiciatis eius consequatur ad recusandae? Id veritatis nulla quae. Ipsam saepe accusantium quod cupiditate sunt corrupti unde architecto beatae officiis! Voluptas optio unde impedit laudantium velit cum voluptate. Nam architecto numquam impedit in rem minus quis aliquid eligendi fugit, asperiores recusandae laboriosam provident cumque, quibusdam quisquam commodi aperiam dicta error voluptates!
               </Content>
            </Flex>
        </View>
    );
}

export default SectionOneLandingPage;
