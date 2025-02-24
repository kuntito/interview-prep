import { Center, VStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const MobileFrame = ({children}: Props) => {
    return (
        <Center width="100vw" height="100vh" backgroundColor="palette.500">
            <VStack
                width="360px"
                height="640px"
                justifyContent="center"
                borderWidth={2}
                gap="32px"
                // up right down left
                padding="16px 16px 0px 16px"
            >
                {children}
            </VStack>
        </Center>
    );
}

export default MobileFrame