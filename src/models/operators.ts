export enum OperatorType {
    Addition = "+",
    Subtraction = "-",
    Division = "/",
    Multiplication = "*",
}

const operators = {
    [OperatorType.Addition]: (a: number, b: number) => a + b,
    [OperatorType.Subtraction]: (a: number, b: number) => a - b,
    [OperatorType.Division]: (a: number, b: number) => a / b,
    [OperatorType.Multiplication]: (a: number, b: number) => a * b,
};
