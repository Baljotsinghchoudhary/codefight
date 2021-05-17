import '@app/@pages/landing-page/landing-page.css';
import {
    Flex,
    View,
    Heading,
    Button,
    Provider,
    Content
} from '@adobe/react-spectrum';
import React from 'react';

const cardList = [{
    title: "Collaborate & code",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi harum a voluptatum doloribus expedita quis beatae voluptate aspernatur quibusdam quidem sit, deleniti dolorum ad porro possimus, sed vel ipsa ex!"
},
{
    title: "Online IDE & complier",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi harum a voluptatum doloribus expedita quis beatae voluptate aspernatur quibusdam quidem sit, deleniti dolorum ad porro possimus, sed vel ipsa ex!"

},
{
    title: "Video calling & chat",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi harum a voluptatum doloribus expedita quis beatae voluptate aspernatur quibusdam quidem sit, deleniti dolorum ad porro possimus, sed vel ipsa ex!"

},
{
    title: "100+ questions",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi harum a voluptatum doloribus expedita quis beatae voluptate aspernatur quibusdam quidem sit, deleniti dolorum ad porro possimus, sed vel ipsa ex!"

}

]

function SectionTwoLandingPage(): JSX.Element {


    const renderCard = (props: any) => {
        return (
            <View
                borderWidth="thin"
                borderColor="dark"
                borderRadius="medium"
                width="100%"
                maxWidth="size-3000"
                minHeight="size-1200"
                padding="size-200"
                margin="size-100"
            >
                <Heading level={2} marginTop={'size-10'}>
                    {props.title}
                </Heading>
                <Content>
                    {
                        props.text
                    }
                </Content>
            </View>
        )
    }


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
                <Heading level={1}>What we offer?</Heading>
                <Flex justifyContent="center" wrap="wrap">
                    {
                        cardList.map(renderCard)
                    }
                </Flex>
            </Flex>
        </View>
    );
}

export default SectionTwoLandingPage;
