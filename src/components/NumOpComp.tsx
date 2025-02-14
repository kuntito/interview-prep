import { Center, HStack, Text } from "@chakra-ui/react";
import React from "react";
import useNumGridStore from "../state-management/numGridStore";
import Card from "./Card";

const NumOpComp = () => {
    const mainOperand = useNumGridStore((s) => s.state.mainOperand);
    const operator = useNumGridStore((s) => s.state.operator);


    const width = "100px";
    const height = "80px";

    return (
        <HStack>
            <Card
                width={width}
                height={height}
                text={`${mainOperand?.num}`}
            />
            <Card
                width={width}
                height={height}
                text={operator ? operator : "?"}
            />
        </HStack>
    );
};

export default NumOpComp;
