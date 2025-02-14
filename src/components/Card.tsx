import { Center, Text} from "@chakra-ui/react";
import React from "react";
import useNumGridStore from "../state-management/numGridStore";

interface Props {
    width: string;
    height: string;
    text: string;
}

const Card = ({text, width, height}: Props) => {
    const { borderWidth, borderColor } = useNumGridStore(
        (s) => s.state.borderProps
    );

    const borderWidthNum = extractNum(borderWidth);
    const modBorderWidth = `${borderWidthNum * 1.8}px`

    return <Center
        borderColor={borderColor}
        width={width}
        height={height}
        fontSize="20px"
        borderWidth={modBorderWidth}
        borderRadius="lg"
    >
        <Text>{text}</Text>
    </Center>
};

export default Card;


const extractNum = (dim: String) => {
    return Number(dim.slice(0, -2));
}
