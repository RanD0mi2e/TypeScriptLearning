let IMPLNO = 0;
class myPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  implNo = IMPLNO;

  constructor(func) {
    this.PromiseState = myPromise.PENDING;
    this.PromiseResult = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    this.implNo++;
    IMPLNO++;
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(result) {
    if (this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.FULFILLED;
      this.PromiseResult = result;
      this.onFulfilledCallbacks.forEach((cb) => cb(result));
    }
  }
  reject(reason) {
    if (this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.REJECTED;
      this.PromiseResult = reason;
      this.onRejectedCallbacks.forEach((cb) => cb(reason));
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled =
    //   typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    // onRejected =
    //   typeof onRejected === "function"
    //     ? onRejected
    //     : (reason) => {
    //         throw reason;
    //       };
    const promise2 = new myPromise((resolve, reject) => {
      if (this.PromiseState === myPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            debugger;
            try {
              if (typeof onFulfilled !== "function") {
                resolve(this.PromiseResult);
              } else {
                const x = onFulfilled(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            debugger;
            try {
              if (typeof onRejected !== "function") {
                reject(this.PromiseResult);
              } else {
                const x = onRejected(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      }
      if (this.PromiseState === myPromise.FULFILLED) {
        setTimeout(() => {
          debugger;
          try {
            if (typeof onFulfilled !== "function") {
              resolve(this.PromiseResult);
            } else {
              const x = onFulfilled(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.PromiseState === myPromise.REJECTED) {
        setTimeout(() => {
          debugger;
          try {
            if (typeof onRejected !== "function") {
              reject(this.PromiseResult);
            } else {
              const x = onRejected(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2;
  }
  catch(onRejected) {
    this.then(null, onRejected);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    throw new TypeError("Chaining cycle detected for promise");
  }
  if (x instanceof myPromise) {
    x.then((y) => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      var then = x.then;
    } catch (error) {
      return reject(error);
    }

    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
}

myPromise.deferred = function () {
  let result = {};
  result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result
};

module.exports = myPromise;

console.log(1);
// let nativeP = new Promise((resolve, reject) => {
//   console.log(2);
//   setTimeout(() => {
//     resolve("这次一定");
//     console.log(4);
//   });
// });
// nativeP.then(
//   (res) => {
//     console.log("fulfilled:", res);
//   },
//   (reason) => {
//     console.log("rejected:", reason);
//   }
// );
let myP = new myPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve("这次一定");
    console.log(4);
  });
});

myP
  .then(
    (res) => {
      console.log("fulfilled:", res);
      return res + "!!!";
      //   return (msg) => {
      //     return msg + '!!!'
      //   }
    },
    (reason) => {
      console.log("rejected:", reason);
    }
  )
  .then((res2) => {
    console.log("fulfilled2:", res2);
  });

console.log(3);
