import { OperatorType } from "../models/operators";
import getRandomNumber from "./get_random_number";

export const getOperands = (
    num: number,
    op: OperatorType
): [number, number] => {
    switch (op) {
        case OperatorType.Addition: {
            return getAdditionOperands(num);
        }
        case OperatorType.Subtraction: {
            return getSubtractionOperands(num);
        }
        case OperatorType.Multiplication: {
            return getMultiplicationOperands(num);
        }
        case OperatorType.Division: {
            return getDivisionOperands(num);
        }
        default: {
            return [0, 0];
        }
    }
};

export const getAdditionOperands = (num: number): [number, number] => {
    if (num < 2) {
        throw new Error(
            "Invalid argument: num must be greater than or equal to 1"
        );
    }
    const first = getRandomNumber(1, num - 1);
    const second = num - first;
    return [first, second];
};

export const getSubtractionOperands = (num: number): [number, number] => {
    if (num < 1) {
        throw new Error(
            "Invalid argument: num must be greater than or equal to 1"
        );
    }

    // i'm returning a two numbers such that their absolute value
    // of their difference is equal to `num`
    // a - b = num

    // to achieve this, i'd generate a random number, `b`
    // a = num + b

    const b = getRandomNumber(1, 100);
    const a = num + b;

    return [a, b];
};

export const getMultiplicationOperands = (num: number): [number, number] => {
    if (num <= 1) {
        throw new Error("Invalid argument: num must be greater than 1");
    }
    if (isPrime(num)) {
        throw new Error("Invalid argument: num cannot be a prime number");
    }

    // i need two factors of `num`
    const smallFactors = getSmallFactors(num);
    const ranIdx = Math.floor(Math.random() * smallFactors.length);
    const a = smallFactors[ranIdx];
    const b = num / a;

    return [a, b];
};

/**
 * Generates a pair of numbers such that the larger number divided by the smaller
 * equals the given `num`. The larger number will not exceed `100`.
 *
 * @param {number} num - The division result to generate operands for. Must be > 1
 * and ≤ the maximum allowable limit based on the largest divisor.
 * @throws {Error} If `num` is ≤ 1 or exceeds the maximum allowable value.
 * @returns {[number, number]} An array where the first element is the larger number
 * and the second element is the smaller number.
 */
export const getDivisionOperands = (num: number): [number, number] => {
    if (num <= 1) {
        throw new Error("Invalid argument: num must be greater than 1");
    }
    const maxValue = 100; // The maximum value allowed for the larger number
    const divisors = [2, 3, 4, 5]; // Valid divisors for generating the pair
    const maxArgLimit = maxValue / divisors[divisors.length - 1]; // Max allowable value for `num`

    if (num > 20) {
        throw new Error(
            `Invalid argument: num must be less than ${maxArgLimit}`
        );
    }

    const ranIdx = Math.floor(Math.random() * divisors.length);
    const smallFactor = divisors[ranIdx];
    const bigFactor = smallFactor * num;

    return [bigFactor, smallFactor];
};

/**
 * Finds and returns all factors of a given number `num` that are less than or
 * equal to the square root of `num`.
 *
 * @param {number} num - The number to find factors for.
 * @returns {number[]} An array of factors of `num` that are <= √num.
 */
const getSmallFactors = (num: number): number[] => {
    const factors = [];

    const limit = Math.sqrt(num);
    for (let i = 2; i <= limit; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }

    return factors;
};

const isPrime = (num: number): boolean => {
    if (num < 2) return false;

    const limit = Math.sqrt(num);
    for (let i = 2; i <= limit; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};
