var hIndex = function (citations) {
    if (!citations.length) return 0
    const map = new Map()
    for (let i = 0; i < citations.length; i++) {
        if (!map.get(citations[i])) {
            map.set(citations[i], 1)
        } else {
            map.set(citations[i], map.get(citations[i]) + 1)
        }
    }
    return map
};

console.log(hIndex([3,0,6,1,5]))

[0,1,3,5,6]