import { printTreeByArray } from "utils";

function test() {
  const treeNums: (number | null)[] = [1, 2, 3, 4, 5, null, 6];
  printTreeByArray(treeNums);
}

test();
