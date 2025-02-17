import { shuffle } from "./shuffle_array";

function get_array_range(a: number, b: number, randomize: boolean=false): number[] {
    const result: number[] = [];
    for (let i = a; i <= b; i++) {
        result.push(i);
    }

    if (randomize) {
        shuffle(result);
    }

    return result;
}

export default get_array_range;