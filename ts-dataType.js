/**
 * typeScript的数据类型
 */
// 枚举类型
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["green"] = 2] = "green";
})(Color || (Color = {}));
var c = Color.blue;
console.log(c);
// 数组类型
var arr = [2, 3];
// 泛型
var arr2 = [1, 2];
console.log(arr);
console.log(arr2);
// 元组
var x;
// x = [2, '123']   赋给x的值和定义的不一致
x = ['hao', 2]; // 正确，赋值类型一致
// any类可以允许进行类型的任意转换（类似原生js）
var y = 4;
y = 'niko';
y = true;
// 定义一个可以存储任意类型的对象
var arrList = [1, 'hiko', true, 456];
arrList[1] = 100;
console.log(arrList);
