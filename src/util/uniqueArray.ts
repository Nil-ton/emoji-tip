export function uniqueArray<T>(array: any, id: string): T {
    const uniqueTitlesSet = new Set();
    const filteredResults = []

    if (array.length < 0) return [] as T
    for (const current of array) {
        if (!uniqueTitlesSet.has(current[id])) {
            uniqueTitlesSet.add(current[id]);
            filteredResults.push(current);
        }
    }
    return filteredResults as T
}