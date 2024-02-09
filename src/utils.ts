// 二叉树
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// 链表
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 根据二叉树层序遍历数组，打印二叉树结构
export function printTreeByArray(treeArr: (number | null)[]): void {
  if (treeArr.length === 0 || treeArr[0] === null) return;

  /* 1. 生成层序遍历二维数组 */
  let lastFloor: (number | null)[] = [treeArr.shift() as number];
  let thisFloor: (number | null)[] = [];
  let floorTreeArr: (number | null | string)[][] = [[...lastFloor]];
  while (treeArr.length) {
    while (lastFloor.length) {
      let nodeNum = lastFloor.shift();
      if (nodeNum === null) {
        thisFloor.push(null);
        thisFloor.push(null);
      } else {
        thisFloor.push(treeArr.shift() as unknown as number | null);
        if (treeArr.length) thisFloor.push(treeArr.shift() as unknown as number | null);
      }
    }
    floorTreeArr.push([...thisFloor]);
    lastFloor = thisFloor;
    thisFloor = [];
  }

  const spaceUnit = " "; // 单位空格
  let nowSpace: null | string = null; // 实际添加上去的空格

  /* 2. 补空格 */
  for (let i = 0; i < floorTreeArr.length; i++) {
    // 节点间补空格
    nowSpace = spaceUnit.repeat(2 ** (i + 1) - 1);
    const floorIndex = floorTreeArr.length - 1 - i;
    floorTreeArr[floorIndex] = floorTreeArr[floorIndex].reduce<(number | string | null)[]>((acc, val, index) => {
      if (index !== 0) acc.push(nowSpace);
      acc.push(val);
      return acc;
    }, []);
    // 每层开头补空格
    nowSpace = spaceUnit.repeat(2 ** i - 1);
    floorTreeArr[floorIndex]
    const floor = floorTreeArr[floorTreeArr.length - 1 - i];
    floor.unshift(nowSpace);
  }

  /* 3. 生成“/”、“\” */
  let printTreeArr: (number | null | string)[][] = [];
  printTreeArr.push(floorTreeArr[0]);
  for (let i = 1; i < floorTreeArr.length; i++) {
    let toLeft = false;
    const branchArr: (number | string)[] = floorTreeArr[i].map((item) => {
      if (typeof item === "string") {
        // 补空格，照抄
        return item;
      } else if (typeof item === "number") {
        // 数字，反转“/”、“\”，添加枝干
        toLeft = !toLeft;
        return toLeft ? "/" : "\\";
      } else if (item === null) {
        // null，反转“/”、“\”，照抄
        toLeft = !toLeft;
        return null;
      }
    }) as (number | string)[];
    printTreeArr.push(branchArr);
    printTreeArr.push(floorTreeArr[i]);
  }

  /* 4. 打印二叉树 */
  for (const printTree of printTreeArr)
    console.log(printTree.map((item) => (item === null ? spaceUnit : item)).join(""));
}

// 根据二叉树层序遍历数组，生成二叉树对象
export function getTreeByArray(treeArr: (number | null)[]): TreeNode | null {
  if (!treeArr.length || treeArr[0] === null) return null;

  // 节点队列，使用i对节点进行遍历，并且根据层序遍历的顺序构建二叉树
  const nodeArr: (TreeNode | null)[] = [{ val: treeArr.shift() as number, left: null, right: null }];
  let i = 0;
  while (i < nodeArr.length) {
    if (nodeArr[i] === null) {
      // 空节点继续向前遍历
      i++;
      continue;
    }
    // 一个节点配套添加左右两个子节点
    const leftNum = treeArr.shift() ?? null;
    const rightNum = treeArr.shift() ?? null;
    nodeArr[i]!.left = leftNum !== null ? { val: leftNum, left: null, right: null } : null;
    nodeArr[i]!.right = rightNum !== null ? { val: rightNum, left: null, right: null } : null;
    // 节点入队
    nodeArr.push(nodeArr[i]!.left);
    nodeArr.push(nodeArr[i]!.right);

    i++;
  }

  return nodeArr[0];
}

// 根据二叉树对象，生成二叉树层序遍历数组
export function getArrayByTree(node: TreeNode | null): (number | null)[] {
  const nodeArr = [node];
  let i = 0;

  while (i < nodeArr.length) {
    if (nodeArr[i]) {
      nodeArr.push(nodeArr[i]!.left);
      nodeArr.push(nodeArr[i]!.right);
    }

    i++;
  }
  // 生成数组
  const res = nodeArr.map((item) => item?.val ?? null);
  // 去除多余null元素
  while (res.at(-1) === null) res.pop();

  return res;
}

// 根据数组对象生成链表
export function getListByArray(array: number[]): ListNode | null {
  let res: ListNode | null = null;
  let prevNode: ListNode | null = null;

  for (const val of array) {
    if (prevNode) {
      prevNode.next = new ListNode(val, null);
      prevNode = prevNode.next;
    } else {
      res = new ListNode(val, null);
      prevNode = res;
    }
  }

  return res;
}

// 根据链表对象生成数组
export function getArrayByList(node: ListNode | null): number[] {
  const res: number[] = [];

  while (node) {
    res.push(node.val);
    node = node.next;
  }

  return res;
}
