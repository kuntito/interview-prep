import { Box, Text } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface Props {
    text: string;
    children?: ReactNode;
}

const OverlayComponent = ({ text, children }: Props) => {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            backgroundColor="rgba(0, 0, 0, 0.5)" // Semi-transparent background
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="1000" // Ensure it's on top
        >
            {children ? (
                children
            ) : (
                <Text fontSize="35px" fontWeight="bold">
                    {text}
                </Text>
            )}
        </Box>
    );
};

export default OverlayComponent;
