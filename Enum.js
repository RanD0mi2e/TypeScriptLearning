/**
 * 1.数字枚举
 * 如果成员没赋值或赋予一个数字，那么后续的枚举成员会根据这个数字自增（默认第一个枚举值为0）
 */
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 1] = "up";
    Direction[Direction["down"] = 2] = "down";
    Direction[Direction["left"] = 3] = "left";
    Direction[Direction["right"] = 4] = "right";
})(Direction || (Direction = {}));
function getSomeVal(maxRange) {
    return Math.random() * maxRange;
}
// 枚举值可以是函数结果，但是没有初始化的成员必须放在首位或手动初始化
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = getSomeVal(10)] = "B";
})(E || (E = {}));
/**
 * 2.字符串枚举
 * 成员的值都是字符串，或者是另一个字符串枚举成员进行初始化
 */
var Direction2;
(function (Direction2) {
    Direction2["up"] = "UP";
    Direction2["down"] = "DOWN";
    Direction2["left"] = "LEFT";
    Direction2["right"] = "RIGHT";
})(Direction2 || (Direction2 = {}));
/**
 * 3.异构枚举
 * 成员值可以是数字+字符串混用，但实际并不推荐这么使用
 */
var BooleanEnum;
(function (BooleanEnum) {
    BooleanEnum["yes"] = "YES";
    BooleanEnum[BooleanEnum["no"] = 0] = "no";
})(BooleanEnum || (BooleanEnum = {}));
/**
 * 4.字面量枚举成员
 * 一种非计算的常量枚举成员的子集
 * 字面量枚举成员构成条件：
 * 1.不带有初始值的常量枚举成员
 * 2.任何字符串字面量（例如："foo"，"bar"，"baz"）
 * 3.任何数字字面量（例如：1, 100）
 * 4.应用了一元-符号的数字字面量（例如：-1, -100）
 */
var shapeKind;
(function (shapeKind) {
    shapeKind[shapeKind["Circle"] = 0] = "Circle";
    shapeKind[shapeKind["Square"] = 1] = "Square";
})(shapeKind || (shapeKind = {}));
let c = {
    // kind: shapeKind.Square, // Error:不能将类型“shapeKind.Square”分配给类型“shapeKind.Circle”。
    kind: shapeKind.Circle,
    radius: 100
};
/**
 * 5.运行时枚举
 * 枚举在运行时是一个真正的对象，可以被传入函数中
 * 编译成js时被包裹在立即执行函数中
 */
var B;
(function (B) {
    B[B["X"] = 0] = "X";
    B[B["Y"] = 1] = "Y";
    B[B["Z"] = 2] = "Z";
})(B || (B = {}));
function fn(obj) {
    return obj.Y;
}
console.log(fn(B));
/**
 * 6.编译时枚举
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["Error"] = "ERROR";
    LogLevel["Warn"] = "WARN";
    LogLevel["Info"] = "INFO";
    LogLevel["Debug"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
function printImportant(key, message) {
    const level = LogLevel[key];
    if (level !== 'WARN') {
        console.log(`Log level key is: ${key}`);
        console.log(`Log level value is: ${level}`);
        console.log(`Log level message is: ${message}`);
    }
}
printImportant('Error', 'this is a Error message.');
/**
 * 7.反向映射
 * 把数字枚举成员的枚举值映射成枚举名字
 * 对于字符串枚举成员不会生成反向映射
 */
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
let a = Enum.A;
let nameOfA = Enum[a];
console.log(nameOfA);
let direction = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
/**
 * type typeof keyof区别
 */
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};
const test = "labelCol"; // keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型
