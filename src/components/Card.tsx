import { border, Center, Text } from "@chakra-ui/react";

interface Props {
    text: string;
}

export const Card = ({ text }: Props) => {
    const width = "100px";
    const height = "80px";
    const fontSize = "20px";
    const borderWidth = "2px";
    const borderColor = "palette.100"

    return (
        <Center
            width={width}
            height={height}
            fontSize={fontSize}
            borderWidth={borderWidth}
            borderRadius="lg"
            borderColor={borderColor}
        >
            <Text>{text}</Text>
        </Center>
    );
};
