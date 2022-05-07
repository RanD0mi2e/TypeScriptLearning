/**
 * typeScript是面向对象的语言
 */
var Site = /** @class */ (function () {
  function Site () {
  }
  // name方法，返回值为空
  Site.prototype.name = function () {
    console.log('Runoob')
  }
  return Site
}())
var obj = new Site()
obj.name()

