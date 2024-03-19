enum PromiseStatus {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

let flagNo = 0

type PromiseFunc = (
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void
) => void;

type ThenFunc = {};

class myPromise {
  promiseStatus = "";
  promiseResult: any;
  resolveCallbacks: any[] = [];
  rejectCallbacks: any[] = [];
  innerNo: number

  constructor(func: PromiseFunc) {
    this.promiseStatus = PromiseStatus.PENDING;
    flagNo++
    this.innerNo = flagNo
    func(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve<T>(value: T) {
    if (this.promiseStatus === PromiseStatus.PENDING) {
      this.promiseStatus = PromiseStatus.FULFILLED;
      this.promiseResult = value;
      this.resolveCallbacks.forEach((cb) => cb(value));
    }
  }

  reject<T>(reason: T) {
    if (this.promiseStatus === PromiseStatus.PENDING) {
      this.promiseStatus = PromiseStatus.REJECTED;
      this.promiseResult = reason;
    }
  }

  then(
    onFulfilled: (value?: any) => any,
    onRejected?: ((reason: any) => PromiseLike<never>) | null | undefined
  ) {
    const promise2 = new myPromise((resolve, reject) => {
      if (this.promiseStatus === PromiseStatus.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== "function") {
              resolve(this.promiseResult);
            } else {
              const x = 
              onFulfilled(this.promiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.promiseStatus === PromiseStatus.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== "function") {
              reject(this.promiseResult);
            } else {
              const x = onRejected(this.promiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.promiseStatus === PromiseStatus.PENDING) {
        this.resolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== "function") {
                resolve(this.promiseResult);
              } else {
                const x = onFulfilled(this.promiseResult);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
        this.rejectCallbacks.push(() => {
          setTimeout(() => {
            if (typeof onRejected !== "function") {
              reject(this.promiseResult);
            } else {
              try {
                const x = onRejected(this.promiseResult);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }
          });
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(
  promise2: myPromise,
  x: PromiseLike<any>,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => any
) {
  if (promise2 === x) {
    throw new TypeError("Chaining cycle detected for promise");
  }

  if (x instanceof myPromise) {
    x.then((y) => resolvePromise(promise2, y, resolve, reject), reject);
  } else if (x != null && (typeof x === "object" || typeof x === "function")) {
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
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
}

// let p = new myPromise((resolve, reject) => {
//   debugger;
//   console.log(1);
//   resolve("发生了改变");
//   console.log(2);
// });
// p.then((res) => {
//   console.log("result:", res);
//   console.log(4);
// });
// console.log(3);

let p = new myPromise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    resolve("发生了改变");
  });
  console.log(2);
});
let p1: any = p
  .then((res) => {
    console.log(4);
    console.log("result:", res);
    return new myPromise((resolve, reject) => {
      console.log(5);
      setTimeout(() => {
        resolve(23);
      }, 1000);
    });
    // return res + "!!!";
  })
  .then((res2) => {
    console.log("result2:", res2);
  });
console.log(3);

/* const promise = new Promise((resolve, reject) => {
  resolve(100);
});
const p1: any = promise.then((value) => {
  console.log(value);
  return p1;
}); */
