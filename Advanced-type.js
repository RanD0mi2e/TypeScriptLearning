/**
 * 1.交叉类型
 * 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
 * 我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。
 */
function extend(first, second) {
    var result = {};
    for (var prop in first) {
        if (first.hasOwnProperty(prop)) {
            result[prop] = first[prop];
        }
    }
    for (var prop in second) {
        if (second.hasOwnProperty(prop)) {
            result[prop] = second[prop];
        }
    }
    return result;
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (name) {
        console.log("Hello, I'm ".concat(name));
    };
    return ConsoleLogger;
}());
var jim = extend(new Person('Jim'), ConsoleLogger.prototype);
console.log(jim.name);
jim.log(jim.name);
/**
 * 2.联合类型
 */
function padLeft(value, padding) {
    if (typeof padding === 'string') {
        return padding + value;
    }
    if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value;
    }
    throw new Error("Expected string or number, but got ".concat(padding));
}
padLeft('Hello World', true);
