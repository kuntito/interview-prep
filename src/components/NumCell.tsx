import React, { useState } from "react";
import { GridPos } from "./NumGrid";
import { Center, Text } from "@chakra-ui/react";

interface Props {
    pos: GridPos;
}

const NumCell = ({ pos }: Props) => {
    const cellSize = "100px";
    const [isActive, setIsActive] = useState(false);
    const onCellClick = (pos: GridPos) => {
        setIsActive(!isActive)
    };

    const borderWidth = isActive ? "4px" : "1px";
    const borderColor = isActive ? "yellow" : "palette.100";
    

    return (
        <Center
            onClick={() => onCellClick(pos)}
            boxSize={cellSize}
            borderWidth={borderWidth}
            borderColor={borderColor}
        >
            <Text>cell</Text>
        </Center>
    );
};

export default NumCell;
