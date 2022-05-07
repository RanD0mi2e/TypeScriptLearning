/**
 * 1.数字枚举
 * 如果成员没赋值或赋予一个数字，那么后续的枚举成员会根据这个数字自增（默认第一个枚举值为0）
 */
enum Direction {
  up = 1,
  down,
  left,
  right
}

function getSomeVal(maxRange: number): number {
  return Math.random() * maxRange
}
// 枚举值可以是函数结果，但是没有初始化的成员必须放在首位或手动初始化
enum E {
  A,
  B = getSomeVal(10)
}

/**
 * 2.字符串枚举
 * 成员的值都是字符串，或者是另一个字符串枚举成员进行初始化
 */
enum Direction2 {  // 这么做的好处是调试时可以读取到枚举运行的值，如果采用数字枚举则语义化不明确，难以读懂
  up = 'UP',
  down = 'DOWN',
  left = 'LEFT',
  right = 'RIGHT'
}

/**
 * 3.异构枚举
 * 成员值可以是数字+字符串混用，但实际并不推荐这么使用
 */
enum BooleanEnum {
  yes = 'YES',
  no = 0
}

/**
 * 4.字面量枚举成员
 * 一种非计算的常量枚举成员的子集
 * 字面量枚举成员构成条件：
 * 1.不带有初始值的常量枚举成员
 * 2.任何字符串字面量（例如："foo"，"bar"，"baz"）
 * 3.任何数字字面量（例如：1, 100）
 * 4.应用了一元-符号的数字字面量（例如：-1, -100）
 */
enum shapeKind {
  Circle,
  Square
}

interface Circle {
  kind: shapeKind.Circle,
  radius: number
}

interface Square {
  kind: shapeKind.Square,
  sideLength: number
}

let c: Circle = {
  // kind: shapeKind.Square, // Error:不能将类型“shapeKind.Square”分配给类型“shapeKind.Circle”。
  kind: shapeKind.Circle,
  radius: 100
}

/**
 * 5.运行时枚举
 * 枚举在运行时是一个真正的对象，可以被传入函数中
 * 编译成js时被包裹在立即执行函数中
 */
enum B {
  X, Y, Z
}

function fn(obj: { X: number, Y: number }) {
  return obj.Y
}

console.log(fn(B))

/**
 * 6.编译时枚举
 */
enum LogLevel {
  Error = 'ERROR',
  Warn = 'WARN',
  Info = 'INFO',
  Debug = 'DEBUG'
}

// 等价于LogLevelStrings = 'Error'|'Warn'|'Info'|'Debug'
type LogLevelStrings = keyof typeof LogLevel
function printImportant(key: LogLevelStrings, message: string) {
  const level = LogLevel[key]
  if (level !== 'WARN') {
    console.log(`Log level key is: ${key}`);
    console.log(`Log level value is: ${level}`);
    console.log(`Log level message is: ${message}`);
  }
}

printImportant('Error', 'this is a Error message.')

/**
 * 7.反向映射
 * 把数字枚举成员的枚举值映射成枚举名字
 * 对于字符串枚举成员不会生成反向映射
 */
enum Enum {
  A
}
let a = Enum.A
let nameOfA = Enum[a]
console.log(nameOfA);

/**
 * 8.const枚举
 * 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。
 * 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。
 */
const enum Directions3 {
  Up,
  Down,
  Left,
  Right
}


let direction: number[] = [Directions3.Up, Directions3.Down, Directions3.Left, Directions3.Right]
// 编译后：var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]

/**
 * type typeof keyof区别
 */
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

// type通常用于定义类型
type layoutType = typeof layout  // typeof 获取变量、对象的类型（和js中的typeof不同）
const test: keyof layoutType = "labelCol" // keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型


