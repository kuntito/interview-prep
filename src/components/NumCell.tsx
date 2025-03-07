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
    const bgColor = isActive ? "palette.highlight" : "palette.300";
    const fontSize = "20px";

    return cell.num ? (
        <Center
            boxSize={"95px"}
            // borderWidth={2}
        >
            <Center
                boxSize={"75px"}
                onClick={() => onCellClick(cell.pos)}
                borderRadius="100%"
                backgroundColor={bgColor}
                style={{
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                    transition: "transform 0.1s ease-in-out",
                    boxShadow: isActive
                        ? "0 4px 8px rgba(234, 11, 11, 0.2)"
                        : "none",
                }}
            >
                <Center
                    boxSize="65px"
                    borderRadius="100%"
                    backgroundColor="palette.100"
                >
                    <Text fontWeight="bold" fontSize={fontSize}>
                        {cell?.num}
                    </Text>
                </Center>
            </Center>
        </Center>
    ) : (
        <></>
    );
};

export default NumCell;
