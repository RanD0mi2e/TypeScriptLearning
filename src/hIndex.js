var hIndex = function (citations) {
  let left = 0;
  let right = citations.length;
  while (left < right) {
    let cnt = 0;
    const mid = Math.floor((left + right + 1) >> 1);
    for (const val of citations) {
      if (val >= mid) {
        cnt++;
      }
    }
    if (cnt >= mid) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left
};

console.log(hIndex([1, 3, 1]));
