import { OperatorType } from "../models/operators";
import get_array_range from "./get_array_range";
import { NumberOperand } from "./get_multi_operands";
import getRandomNumber from "./get_random_number";
import { shuffle } from "./shuffle_array";

export const getOperands = (
    op: OperatorType,
    numsNeeded: number
): NumberOperand | undefined => {
    switch (op) {
        case OperatorType.Addition: {
            return getAdditionOperands(numsNeeded);
        }
        case OperatorType.Subtraction: {
            return getSubtractionOperands(numsNeeded);
        }
        case OperatorType.Multiplication: {
            return getMultiplicationOperands(numsNeeded);
        }
        case OperatorType.Division: {
            return getDivisionOperands(numsNeeded);
        }
        default: {
            console.log("operator type not found");
            return;
        }
    }
};

/**
 * Generates a set of numbers for an addition problem, ensuring that exactly two numbers
 * add up to a randomly selected target, and the remaining numbers do not interfere with
 * the target sum.
 *
 * @param numsNeeded - The total number of operands required (including the two numbers
 *                     that add up to the target).
 * @returns An object containing:
 *          - `num`: The target number (sum of the two main operands).
 *          - `operands`: The two numbers (`uno` and `dos`) that add up to the target.
 *          - `allNumbers`: The full list of numbers, including the two main operands
 *                          and additional random numbers that do not sum to the target.
 */
const getAdditionOperands = (numsNeeded: number): NumberOperand => {
    const target = getRandomNumber(20, 100);

    const minFactor = 2;
    const uno = getRandomNumber(minFactor, target - minFactor);
    const dos = target - uno;

    numsNeeded -= 2;
    console.log(numsNeeded);

    const operands = [uno, dos];
    const avoid = new Set(operands);

    const allNumbers = [...operands];

    // rather than get a random number each time,
    // i retrieve an array a range and pop from it
    const pool = get_array_range(minFactor, target - minFactor, true);

    while (allNumbers.length < numsNeeded && pool.length > 0) {
        const candidate = pool.pop()!;
        if (avoid.has(candidate)) continue;
        allNumbers.push(candidate);

        if (candidate < target) {
            const complement = target - candidate;
            avoid.add(complement);
        }
    }

    // return { num: 4, operands: [2, 2], allNumbers: [2, 2] };
    return { num: target, operands: operands, allNumbers: allNumbers };
};

const getSubtractionOperands = (numsNeeded: number): NumberOperand => {
    const targetDiff = getRandomNumber(1, 5);

    const maxNumber = 100;
    const pool = get_array_range(1, maxNumber - targetDiff + 1, true);

    const smallNum = pool.pop()!;
    const bigNum = smallNum + targetDiff;

    const operands = [smallNum, bigNum];
    const toAvoid = new Set(operands);

    const allNumbers = [...operands];
    while (allNumbers.length < numsNeeded && pool.length > 0) {
        const cand = pool.pop()!;
        const absOne = cand - targetDiff;
        const absTwo = cand + targetDiff;
        if (toAvoid.has(cand) || toAvoid.has(absOne) || toAvoid.has(absTwo)) {
            continue;
        }

        allNumbers.push(cand);
        toAvoid.add(absOne);
        toAvoid.add(absTwo);
    }

    // return { num: 4, operands: [2, 2], allNumbers: [2, 2] };
    return { num: targetDiff, operands: operands, allNumbers: allNumbers };
};

const getDivisionOperands = (numsNeeded: number): NumberOperand => {
    const target = getRandomNumber(2, 10);

    const smallNumber = getRandomNumber(2, 10);
    const bigNumber = smallNumber * target;

    const pool = get_array_range(2, 100, true);
    const operands = [smallNumber, bigNumber];

    const toAvoid = new Set(operands);
    const allNumbers = [...operands];

    while (allNumbers.length < numsNeeded && pool.length > 0) {
        const cand = pool.pop()!;
        const high = cand * target;
        const low = cand / target;

        if (toAvoid.has(cand) || toAvoid.has(high) || toAvoid.has(low)) {
            continue;
        }

        allNumbers.push(cand);
        toAvoid.add(high);
        toAvoid.add(low);
    }

    // return { num: 4, operands: [2, 2], allNumbers: [2, 2] };
    return { num: target, operands: operands, allNumbers: allNumbers };
};

const getMultiplicationOperands = (numsNeeded: number): NumberOperand => {
    const maxNum = 100;
    const numOne = getRandomNumber(2, 50);

    const numTwo = getRandomNumber(2, Math.floor(maxNum / numOne));
    const target = numOne * numTwo;

    const operands = [numOne, numTwo];
    const toAvoid = new Set(operands);
    const allNumbers = [...operands];

    const pool = get_array_range(2, 100, true);
    while (allNumbers.length < numsNeeded && pool.length > 0) {
        const cand = pool.pop()!;
        const multiplier = target % cand ? null : target / cand;

        if (toAvoid.has(cand)) continue;
        if (multiplier && toAvoid.has(multiplier)) continue;

        if (multiplier) {
            toAvoid.add(multiplier);
        }
        allNumbers.push(cand);
    }

    // return { num: 4, operands: [2, 2], allNumbers: [2, 2] };
    return { num: target, operands: operands, allNumbers: allNumbers };
};