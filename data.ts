let seven: number | string;

(seven as number).toFixed(3);
// 断言成 string 类型
(seven as string).length;

seven.toString();
