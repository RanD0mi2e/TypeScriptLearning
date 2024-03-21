/**
 * 除了自身以外数组的乘积
 */

/* 示例 1:

输入: nums = [1,2,3,4]
输出: [24,12,8,6]
示例 2:

输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0] 

*/
function productExceptSelf(nums: number[]): number[] {
  let result = [1]
  for (let i = 1; i < nums.length; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  let r = 1
  for(let i = nums.length - 1; i >= 0; i--) {
    result[i] = result[i] * r
    r = r * nums[i]
  }

  return result;
}

console.log(productExceptSelf([4, 5, 1, 8, 2]));
