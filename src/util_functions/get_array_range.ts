function get_array_range(a: number, b: number): number[] {
    const result: number[] = [];
    for (let i = a; i <= b; i++) {
        result.push(i);
    }
    return result;
}

export default get_array_range;