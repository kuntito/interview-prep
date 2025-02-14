import { Center, Text } from "@chakra-ui/react";
import useNumGridStore from "../state-management/numGridStore";

export interface GridPos {
    ri: number;
    ci: number;
}

export interface NumCellModel {
    pos: GridPos;
    num?: number;
}

interface Props {
    cellPos: GridPos;
    cellSize: number;
}

// each cell can be clicked
// if it's clicked, it's appearance changes
const NumCell = ({ cellPos, cellSize }: Props) => {
    const { borderWidth, borderColor } = useNumGridStore(
        (s) => s.state.borderProps
    );
    const cellSizeArg = `${cellSize}px`;
    
    const cells = useNumGridStore(s => s.state.cells);
    const {ri, ci} = cellPos;
    const cellModel = cells[ri][ci];
    
    const { selectCell } = useNumGridStore();
    
    const selectedCells = useNumGridStore(s => s.state.selectedCells);
    const modBorderColor = selectedCells.includes(cellPos) ? "white" : borderColor;
    const modBorderWidth = selectedCells.includes(cellPos) ? "4px" : borderWidth;
    const fontSize = "40px"

    return (
        <Center
            onClick={() => selectCell(cellPos)}
            borderColor={modBorderColor}
            boxSize={cellSizeArg}
            borderWidth={modBorderWidth}
        >
            {cellModel.num && <Text fontSize={fontSize}>{cellModel.num}</Text>}
        </Center>
    );
};

export default NumCell;
