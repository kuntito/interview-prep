import React, { useState } from "react";
import { Center, Text } from "@chakra-ui/react";
import { CellModel } from "../models/CellModel";
import useNumGridStore from "../state-management/numGridStore";

interface Props {
    cell: CellModel;
}

const NumCell = ({ cell }: Props) => {
    const cellSize = "100px";
    // const [isActive, setIsActive] = useState(false);
    
    // const onCellClick = (pos: GridPos) => {
    //     setIsActive(!isActive)
    // };

    const { onCellClick } = useNumGridStore();
    const selectedCells = useNumGridStore(s => s.state.gridState.selectedCells);

    const isActive = selectedCells.includes(cell.pos); 
    const borderWidth = isActive ? "4px" : "1px";
    const borderColor = isActive ? "yellow" : "palette.100";
    
    // console.log(cell);
    
    return (
        <Center
            onClick={() => onCellClick(cell.pos)}
            boxSize={cellSize}
            borderWidth={borderWidth}
            borderColor={borderColor}
        >
            <Text>{cell?.num}</Text>
        </Center>
    );
};

export default NumCell;
