/**
 * 1.交叉类型(类似于交集)
 * 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
 * 我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。
 */
function extend<First, Second>(first: First, second: Second): First & Second {
  const result: Partial<First & Second> = {}
  for (const prop in first) {
    if (first.hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop]
    }
  }
  for (const prop in second) {
    if (second.hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop]
    }
  }
  return result as First & Second
}

class Person {
  constructor(public name: string) { }
}

interface Loggable {
  log(name: string): void
}

class ConsoleLogger implements Loggable {
  log(name: string): void {
    console.log(`Hello, I'm ${name}`)
  }
}

const jim = extend(new Person('Jim'), ConsoleLogger.prototype)
console.log(jim.name);
jim.log(jim.name)

/**
 * 2.联合类型（类似于并集）
 * 联合类型表示一个值可以是几种类型之一。
 * 我们用竖线（|）分隔每个类型，所以number | string | boolean表示一个值可以是number，string，或boolean。
 */
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'string') {
    return padding + value
  }
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  throw new Error(`Expected string or number, but got ${padding}`)
}

padLeft('Hello World', 123)

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
  fly(),
  layEggs()
}

interface Fish {
  swim(),
  layEggs()
}

function getSmallPet(): Bird | Fish {
  return
}

let pet = getSmallPet()

// 如果联合类型需要使用某个类中的成员，必须使用类型断言
if ((pet as Fish).swim) {
  (pet as Fish).swim()
} else if ((pet as Bird).fly) {
  (pet as Bird).fly()
}
// 上述的方式需要对变量逐个进行类型断言，为了简化代码，引入`类型守卫`机制

/**
 * 3.类型守卫：类型守卫就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。
 */
// 定义一个自定义的类型守卫函数
function isFish(pet: Bird | Fish): pet is Fish {  // pet is Fish 类型谓词，其中pet必须是函数中传入的参数名
  return (pet as Fish).swim !== undefined   // pet作为Fish类型必须有swim成员
}

// 这样可以简化上述的代码
if (isFish(pet)) {
  pet.swim()  // pet是Fish类
} else {
  pet.fly()   // pet是Bird类
}


// 使用`in`操作符，可以作为类型细化表达式
function move(pet: Fish | Bird) {
  if ('swim' in pet) {  // pet中包含有swim成员属性
    pet.swim()
  } else {
    pet.fly()  // pet中不包含swim成员属性
  }
}

// 传统的定义函数类型守卫
function isNumber(x: any): x is number {
  return typeof x === 'number'
}

function isString(x: any): x is number {
  return typeof x === 'string'
}

function padLeft2(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value
  }

  if (isString(padding)) {
    return padding + value
  }

  throw new Error("Expected number or string, but got " + padding);
}
// 每一个类型守卫都是一个函数代码量很大，因此下面使用typeof进行改良

// 定义一个typeof类型守卫，因为TypeScript可以将它识别为一个类型守卫。也就是说我们可以直接在代码里检查类型了不需要写函数。
function padLeft3(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
// 使用typeof进行类型守卫只有两种形式能被识别：typeof v === "typename"和typeof v !== "typename"，
// 其中"typename"必须是"number"，"string"，"boolean"或"symbol"。
// 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型守卫。
