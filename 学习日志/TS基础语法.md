# TypeScript基础语法学习

## 一、TypeScript的安装：

​		国内镜像：npm config set registry https://registry.npmmirror.com

​		安装typeScript：npm install -g typescript

​		ts代码转js代码命令： tsc xxx.ts

​		![](D:\fontEnd\TypeScript-demo\image-repository\Snipaste_2022-04-20_22-31-36.png)

​		tsc命令可以同时编译多个ts文件：

​				tsc F1.ts F2.ts F3.ts ...

## 二、TypeScript基础类型：

​		**空白与换行：**TypeScript 会忽略程序中出现的空格、制表符和换行符。

空格、制表符通常用来缩进代码，使代码易于阅读和理解。

​		**区分大小写：**ts区分大小写

​		**注释的用法：**

​				//——单行注释

​				/* */——多行注释

​		**typeScript是面向对象的：**

​		***typeScript基础数据类型:**

​				any——任意类型（不要滥用，否则会把typeScript变成anyScript！）

​				number——双精度64位，可以表示整数和分数

```js
// number类型例子
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744;    // 八进制
let decLiteral: number = 6;    // 十进制
let hexLiteral: number = 0xf00d;    // 十六进制
```

​				String——字符串类型，可以用‘ ’，“ ”，和``（用法和js一致）

​				Boolean——布尔类型

​				数组类型，用法通常是在元素类型后面加上[ ]标识符：

```typescript
// 在元素类型后面加上[]
let arr: number[] = [1, 2];

// 或者使用数组泛型
let arr: Array<number> = [1, 2];
```

​				元组——表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。

```typescript
let x: [string, number];
x = ['Runoob', 1];    // 运行正常
x = [1, 'Runoob'];    // 报错
console.log(x[0]);    // 输出 Runoob
```

​				enum——枚举，用于定义数值集合

```typescript
enum Color {Red, Green, Blue};
let c: Color = Color.Blue;
console.log(c);    // 输出 2
```

​				void——标识方法返回值的类型，表示该方法没有返回值

​				null——表示对象值缺失

​				undefined——表示初始化变量是一个未定义的值

​				null——null是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

​				undefined——undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

**注意：**Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：

```typescript
// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined;    // 运行错误
x = null;    // 运行错误

// 上面的例子中变量 x 只能是数字类型。如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确
```

​				never——never 是其它类型（包括 null 和 undefined）的子类型，表示的是那些**永不存在**的值的类型。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）。

```typescript
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}


```

​				Object——表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

## 三、变量声明

​		1.var、let、const的用法和js一致，这里就不展开细说

​		2.对象解构：({ a, b } = { a: "baz", b: 101 })，加花括号是为了避免js把‘{’把它当作语句解析起点。

​		3.对象解构重命名：let { a: newName1, b: newName2 } = o，类似于做了以下操作：

​				let newName1 = o.a; 

​				let newName2 = o.b;

​		4.对于ts中，对象解构可以指定类型：

​				let {a, b}: {a: string, b: number} = o;

​		5.对象解构可以采用默认值：

​				let { a, b = 1001 } : { a: string, b?: number } = wholeObject，这表示b不传值时默认为1001。

​		6.展开操作符和解构相反

​				let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };

​				let search = { food: "rich", ...defaults };

​			在上面的语法中，defaults对象展开后，food:"spicy"会覆盖掉food:"rich";

​		7.展开一个对象实例时，实例的方法会丢失：

```typescript
// 展开后方法m()丢失了
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```

​		其次，TypeScript编译器不允许展开泛型函数上的类型参数。 这个特性会在TypeScript的未来版本中考虑实现。

## 四、接口

​		1.可选属性：	

```typescript
// 属性名后面的？表示该属性可以选择性传入
interface SquareConfig {
  color?: string;
  width?: number;
}
// 可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。
```

​		2.只读属性：一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly`来指定只读属性:

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

​		TypeScript具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改:

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

​		`readonly` vs `const`：最简单判断该用`readonly`还是`const`的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用`readonly`。

​		3.函数类型：接口除了描述对象外，还可以描述函数类型：

```typescript
// 接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 使用接口
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
```

​		4.可索引的类型：与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如`a[10]`或`ageMap["daniel"]`。 可索引类型具有一个 *索引签名*，它描述了对象索引的类型，还有相应的索引返回值类型。

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

​		TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。

```typescript
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
    [x: number]: Animal;
    [x: string]: Dog;
}
```

​		5.类类型——实现接口：js中实现接口和java作用基本一致，TypeScript也能够用它来明确的强制一个类去符合某种契约。

```typescript
// 可以在接口中抽象描述一个方法，在类中去实现它
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
```

