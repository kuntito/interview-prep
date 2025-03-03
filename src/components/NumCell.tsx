import { Center, Text } from "@chakra-ui/react";
import { CellModel } from "../models/CellModel";
import useNumGridStore from "../state-management/numGridStore";

interface Props {
    cell: CellModel;
}

const NumCell = ({ cell }: Props) => {
    const cellSize = "100px";

    const { onCellClick } = useNumGridStore();
    const selectedCells = useNumGridStore((s) => s.state.selectedCells);

    const isActive = selectedCells.includes(cell.pos);
    const borderWidth = isActive ? "4px" : "1px";
    const borderColor = isActive ? "yellow" : "palette.100";
    const fontSize = "20px";

    return (
        <Center
            onClick={() => onCellClick(cell.pos)}
            boxSize={cellSize}
            borderWidth={borderWidth}
            borderColor={borderColor}
        >
            <Text fontWeight="bold" fontSize={fontSize}>
                {cell?.num}
            </Text>
        </Center>
    );
};

export default NumCell;
