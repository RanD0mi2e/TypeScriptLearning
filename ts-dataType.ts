/**
 * typeScript的数据类型
 */

// 枚举类型
enum Color { red, blue, green }
let c: Color = Color.blue
console.log(c);

// 数组类型
let arr: number[] = [2, 3]
// 泛型
let arr2: Array<number> = [1, 2]
console.log(arr)
console.log(arr2)

// 元组
let x: [String, Number]
// x = [2, '123']   赋给x的值和定义的不一致
x = ['hao', 2]  // 正确，赋值类型一致

// any类可以允许进行类型的任意转换（类似原生js）
let y: any = 4
y = 'niko'
y = true
// 定义一个可以存储任意类型的对象
let arrList: any[] = [1, 'hiko', true, 456]
arrList[1] = 100
console.log(arrList);

