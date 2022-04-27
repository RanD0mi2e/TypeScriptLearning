// demo-1 类基础例子
class Greeter {
  // 成员变量
  greeting: string
  // 构造器
  constructor(messege: string) {
    this.greeting = messege
  }
  // 方法
  getGreet() {
    return 'Hello' + this.greeting
  }
}

let greeter = new Greeter('world')
