function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}

// 泛型类型
interface GenericIdentityFn<T> {
  (arg: T): T
}

function Identity<T>(arg: T): T {
  return arg
}

let myGeneric: GenericIdentityFn<number> = Identity

// 泛型类(用法和泛型接口类似)
class GenericNumber<T>{
  originVal: T
  add: (x: T, y: T) => T  // x,y都是泛型，返回值也是泛型
}

// 数字类
let mg1 = new GenericNumber<number>()
mg1.originVal = 0
mg1.add = function (x, y) {
  return x + y
}
// 字符串类
let sg1 = new GenericNumber<string>()
sg1.originVal = '0'
sg1.add = function (x, y) {
  return x + y
}

// 泛型约束
interface LengthWise {
  length: number
}

function loggingIdentity3<T extends LengthWise>(arg: T): T {
  console.log(arg.length)
  return arg
}

loggingIdentity3({ length: 10, value: 3 })

// 泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, 2);  // error, K参数被约束为a~d之间且为String类型，2是number类型，显然不满足条件


class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

// c:{new():T} 和 c:new()=>T是一样的，后者是前者的简写，意即C的类型是对象类型且这个对象包含返回类型是T的构造函数。
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
