import { HStack, VStack } from "@chakra-ui/react";
import NumCell from "./NumCell";
import { CellModel } from "../models/CellModel";
import useNumGridStore from "../state-management/numGridStore";

export interface GridPos {
    ri: number;
    ci: number;
}

const NumGrid = () => {
    const borderWidth = "2px";
    const borderColor = "palette.100";

    // const dummyCell: CellModel = {pos: {ri: 0, ci: 0}, num: 2};
    // const dummyRow: CellModel[] = [dummyCell, dummyCell, dummyCell];
    // const cells = [dummyRow, dummyRow, dummyRow];

    const cells = useNumGridStore((s) => s.state.gridState.cells);
    // console.log(cells);

    return (
        <VStack borderWidth={borderWidth} borderColor={borderColor} gap={0}>
            {cells.map((row, ri) => (
                <HStack gap={0} key={ri}>
                    {row.map((cellModel, ci) => (
                        <NumCell key={`${ri}-${ci}`} cell={cellModel} />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};

export default NumGrid;
