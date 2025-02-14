import { Box, Text } from "@chakra-ui/react";

interface Props {
    text: string;
}

const OverlayComponent = ({text}: Props) => {
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
            <Text fontSize="2xl" fontWeight="bold" color="white">
                {text}
            </Text>
        </Box>
    );
};

export default OverlayComponent;
