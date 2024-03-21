/**
 * 加油站
 */

/* 示例 1:

输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
输出: 3
解释:
从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。
示例 2:

输入: gas = [2,3,4], cost = [3,4,3]
输出: -1
解释:
你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
因此，无论怎样，你都不可能绕环路行驶一周。 
*/

/* function canCompleteCircuit(gas: number[], cost: number[]): number {
  let i = 0
  let n = gas.length
  while(i < n) {
    let cnt = 0
    let sumGas = 0
    let sumCost = 0
    while(cnt < n) {
      let j = (cnt + i) % n
      sumGas += gas[j]
      sumCost += cost[j]
      if(sumCost > sumGas) {
        break
      }
      cnt++
    }
    if(cnt === n) {
      return i
    } else {
      i += cnt + 1
    }
  }
  return -1
} */

function canCompleteCircuit(gas: number[], cost: number[]): number {
  let totalGas = 0
  let currentGas = 0
  let start = 0
  for(let i = 0; i < gas.length; i++) {
    totalGas += gas[i] - cost[i]
    currentGas += gas[i] - cost[i]
    if(currentGas < 0) {
      start += i + 1
      currentGas = 0
    }
  }
}

console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3]));
