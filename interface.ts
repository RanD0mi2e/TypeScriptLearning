/**
 * @author Randomize
 */

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

// demo-3
// 函数类型的构造接口
interface ClockConstructor {
  new(hour: number, minute: number)
}

// 报错：
// 1.类'Clock'错误实现接口'ClockConstructor'
// class Clock implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }

// demo-4
// 类静态部分与实例部分：通常一个类实现一个接口，只会对实例部分进行类型检查
// 1.实例部分接口
interface StudentInterface {
  id: string,
  age: number,
}

// 2.静态部分接口(函数类型)
interface StudentInfoType {
  new(classId: string, code: string, age: number): StudentInterface
}

// 3.定义构造函数
function createStudent(studentInfo: StudentInfoType, classId: string, code: string, age: number): StudentInterface {
  return new studentInfo(classId, code, age)
}

// 4.定义类，声明时实现实例部分接口
class StudentItem implements StudentInterface {
  id: string
  age: number
  constructor(classId: string, code: string, age: number) {
    this.id = classId + ' ' + code
    this.age = age
  }
}

// 5.实例化对象
let res = createStudent(StudentItem, 'niko', '001', 18)
// 上面定义的两个接口可以使得class在实例化的时候，静态部分constructor和实例部分都能进行严格的类型检查


// demo-5 接口继承
interface Shape {
  color: string
}

interface penStoke {
  penWidth: number
}

// 单继承
interface Square extends Shape {
  sideLength: number
}

// 多继承
interface Square2 extends Shape, penStoke {
  sideLength: number
}

// 类型断言
let square = {} as Square
square.color = 'pink'
square.sideLength = 10
let square2 = {} as Square2
square2.color = 'red'
square2.penWidth = 15
square2.sideLength = 16

// demo-6 混合类型
interface Counter {
  (start: number): string,
  interval: number,
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { }
  counter.interval = 13
  counter.reset = function () { }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 15

// demo-7 接口继承类
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
// 原因：Image类不是Control子类，不能实现SelectableControl
// class Image implements SelectableControl {
//   select() { }
// }

