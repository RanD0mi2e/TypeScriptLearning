var twoSum = function (numbers: number[], target: number) {
  for (let i = 0; i < numbers.length; i++) {
    let minusNum = target - numbers[i];
    let left = i + 1;
    let right = numbers.length - 1;
    while (left <= right) {
      let middle = Math.floor(left + (right - left) / 2);
      if (numbers[middle] > minusNum) {
        right = middle - 1;
      } else if (numbers[middle] < minusNum) {
        left = middle + 1;
      } else {
        return [i + 1, middle + 1];
      }
    }
    return [-1, -1];
  }
};

console.log(twoSum([5,25,75], 100))
