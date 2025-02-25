import { OperatorType } from "./OperatorType";

export interface OperandInfo {
    targetNum: number;
    mainOperands: number[];
    allOperands: number[];
    operator: OperatorType;
}

export const dummyOperandInfo: OperandInfo = {
    targetNum: 6,
    mainOperands: [2, 4],
    allOperands: [2, 4, 3, 5],
    operator: OperatorType.Addition,
}