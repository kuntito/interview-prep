import { HStack, VStack } from "@chakra-ui/react";
import NumCell from "./NumCell";

export interface GridPos {
    ri: number;
    ci: number;
}

const NumGrid = () => {
    const borderWidth = "2px";
    const borderColor = "palette.100";

    const arr = [0, 1, 2];

    return (
        <VStack borderWidth={borderWidth} borderColor={borderColor} gap={0}>
            {arr.map((row, ri) => (
                <HStack gap={0} key={ri}>
                    {arr.map((model, ci) => (
                        <NumCell key={`${ri}-${ci}`} pos={{ ri: ri, ci: ci }} />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};

export default NumGrid;
