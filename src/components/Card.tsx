import { border, Center, Text } from "@chakra-ui/react";

interface Props {
    text: string;
    fontSizee?: string; // hack to increase operator font size
}

export const Card = ({ text, fontSizee }: Props) => {
    const width = "100px";
    const height = "80px";
    const fontSize = "20px";
    const borderWidth = "2px";
    const borderColor = "palette.100"

    return (
        <Center
            width={width}
            height={height}
            fontSize={fontSizee ? fontSizee : fontSize}
            borderWidth={borderWidth}
            borderRadius="lg"
            borderColor={borderColor}
        >
            <Text>{text}</Text>
        </Center>
    );
};
