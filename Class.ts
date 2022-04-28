// demo-1 类基础例子
// class Greeter {
//   // 成员变量
//   greeting: string
//   // 构造器
//   constructor(messege: string) {
//     this.greeting = messege
//   }
//   // 方法
//   getGreet() {
//     return 'Hello' + this.greeting
//   }
// }

// let greeter = new Greeter('world')

// demo-2 存取器属性
let passcode = "secret passcode";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    }
    else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  alert(employee.fullName);
}

// demo-3 静态属性
class Grid {
  static origin = { x: 0, y: 0 }
  // 倍率，私有属性
  private _scale: number
  constructor(public scale: number) {
    this._scale = scale
  }
  calculateDistanceFromOrigin(point: { x: number, y: number }) {
    // static定义的属性不能使用this获取到，必须使用类名
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this._scale
  }
  get getScale() {
    return this._scale
  }
  set setScale(scaleMultiple: number) {
    this._scale = scaleMultiple
  }
}

let grid = new Grid(1)
grid.calculateDistanceFromOrigin({ x: 3, y: 4 })
grid.setScale = 5
grid.calculateDistanceFromOrigin({ x: 3, y: 4 })

class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    }
    else {
      return Greeter.standardGreeting;
    }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
