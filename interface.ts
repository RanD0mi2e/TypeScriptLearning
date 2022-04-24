// demo-1
// 使用接口表示函数类型
interface SearchFunc {
  (source: string, subString: string): boolean
}

// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
let mySearch: SearchFunc
mySearch = function (src: string, subStr: string): boolean {
  let result = src.search(subStr)
  return result > -1
}

console.log(mySearch('index', 'in'));

// demo-2
class Animal {
  name: string;
}

class Dog extends Animal {
  breed: string;
}

// 数字索引和字符串索引同时存在时，数字类型key对应的value必须是字符串类型key对应的vaue子类型
// 因为在js中，Array类和Object类底层都是哈希表，Array类是个伪数组；
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  // [x: number]: Animal;
  [x: string]: Dog;
}

interface NumberDictionary {
  // [index: string]: number;  // 如果加上这行代码，说明接口中属性的存储类型味 string：number，那么 name：string必然报错
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
