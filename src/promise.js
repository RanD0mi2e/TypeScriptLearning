class myPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(func) {
    this.PromiseState = myPromise.PENDING;
    this.PromiseResult = null;
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
    }
  }
  reject(reason) {
    if (this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.REJECTED;
      this.PromiseResult = reason;
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    if (this.PromiseState === myPromise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.PromiseResult);
      });
    }
    if (this.PromiseState === myPromise.REJECTED) {
      setTimeout(() => {
        onRejected(this.PromiseResult);
      });
    }
  }
  catch(onRejected) {
    this.then(null, onRejected);
  }
}

console.log(1);

let nativeP = new Promise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        resolve('这次一定')
        console.log(4);
    }, );
})
nativeP.then((res) => {
    console.log('fulfilled:', res);
}, (reason) => {
    console.log('rejected:', reason);
})

// let myP = new myPromise((resolve, reject) => {
//   console.log(2);
//   setTimeout(() => {
//     resolve("这次一定");
//     console.log(4);
//   });
// });

// myP.then(
//   (res) => {
//     console.log("fulfilled:", res);
//   },
//   (reason) => {
//     console.log("rejected:", reason);
//   }
// );

console.log(3);
