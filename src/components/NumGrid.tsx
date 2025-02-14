import { HStack, VStack } from "@chakra-ui/react";
import useNumGridStore from "../state-management/numGridStore";
import NumCell from "./NumCell";

export interface GridDim {
    rows: number;
    cols: number;
}

interface Props {
    cellSize: number;
}

const NumGrid = ({ cellSize }: Props) => {
    const cells = useNumGridStore((s) => s.state.cells);
    const borderWidth = "2px";
    const borderColor = "palette.100";
    return (
        <VStack borderWidth={borderWidth} borderColor={borderColor} gap={0}>
            {cells.map((row, ri) => (
                <HStack gap={0} key={ri}>
                    {row.map((model, ci) => (
                        <NumCell
                            key={`${ri}-${ci}`}
                            cellPos={model.pos}
                            cellSize={cellSize}
                            borderWidth={borderWidth}
                            borderColor={borderColor}
                        />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};

export default NumGrid;
