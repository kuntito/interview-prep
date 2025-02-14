import { OperatorType } from "../models/operators";
import { getOperands } from "./get_operands";

export interface NumberOperand {
    num: number;
    operands: number[];
}

export const getMultiOperands = (
    args: number[],
    operator: OperatorType
): NumberOperand[] => {
    return args.map((ag) => {
        const rands = getOperands(ag, operator);
        return {
            num: ag,
            operands: rands,
        };
    });
};
