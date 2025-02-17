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
        const cand = pool.pop()!
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

    while (allNumbers.length < numsNeeded && pool.length > 0){
        const cand = pool.pop()!;
        const high = cand * target;
        const low = cand / target;

        if (toAvoid.has(cand) || toAvoid.has(high) || toAvoid.has(low)){
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
    return { num: 4, operands: [2, 2], allNumbers: [2, 2] };
};

// export const getSubtractionOperands = (num: number): [number, number] => {
//     if (num < 1) {
//         throw new Error(
//             "Invalid argument: num must be greater than or equal to 1"
//         );
//     }

//     // i'm returning a two numbers such that their absolute value
//     // of their difference is equal to `num`
//     // a - b = num

//     // to achieve this, i'd generate a random number, `b`
//     // a = num + b

//     const b = getRandomNumber(1, 100);
//     const a = num + b;

//     return [a, b];
// };

// export const getMultiplicationOperands = (num: number): [number, number] => {
//     if (num <= 1) {
//         throw new Error("Invalid argument: num must be greater than 1");
//     }
//     if (isPrime(num)) {
//         throw new Error("Invalid argument: num cannot be a prime number");
//     }

//     // i need two factors of `num`
//     const smallFactors = getSmallFactors(num);
//     const ranIdx = Math.floor(Math.random() * smallFactors.length);
//     const a = smallFactors[ranIdx];
//     const b = num / a;

//     return [a, b];
// };

// /**
//  * Generates a pair of numbers such that the larger number divided by the smaller
//  * equals the given `num`. The larger number will not exceed `100`.
//  *
//  * @param {number} num - The division result to generate operands for. Must be > 1
//  * and ≤ the maximum allowable limit based on the largest divisor.
//  * @throws {Error} If `num` is ≤ 1 or exceeds the maximum allowable value.
//  * @returns {[number, number]} An array where the first element is the larger number
//  * and the second element is the smaller number.
//  */
// export const getDivisionOperands = (num: number): [number, number] => {
//     if (num <= 1) {
//         throw new Error("Invalid argument: num must be greater than 1");
//     }
//     const maxValue = 100; // The maximum value allowed for the larger number
//     const divisors = [2, 3, 4, 5]; // Valid divisors for generating the pair
//     const maxArgLimit = maxValue / divisors[divisors.length - 1]; // Max allowable value for `num`

//     if (num > 20) {
//         throw new Error(
//             `Invalid argument: num must be less than ${maxArgLimit}`
//         );
//     }

//     const ranIdx = Math.floor(Math.random() * divisors.length);
//     const smallFactor = divisors[ranIdx];
//     const bigFactor = smallFactor * num;

//     return [bigFactor, smallFactor];
// };

// /**
//  * Finds and returns all factors of a given number `num` that are less than or
//  * equal to the square root of `num`.
//  *
//  * @param {number} num - The number to find factors for.
//  * @returns {number[]} An array of factors of `num` that are <= √num.
//  */
// const getSmallFactors = (num: number): number[] => {
//     const factors = [];

//     const limit = Math.sqrt(num);
//     for (let i = 2; i <= limit; i++) {
//         if (num % i === 0) {
//             factors.push(i);
//         }
//     }

//     return factors;
// };

// const isPrime = (num: number): boolean => {
//     if (num < 2) return false;

//     const limit = Math.sqrt(num);
//     for (let i = 2; i <= limit; i++) {
//         if (num % i === 0) {
//             return false;
//         }
//     }
//     return true;
// };
