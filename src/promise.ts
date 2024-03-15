enum PromiseStatus {
  PENDING,
  FULLFILLED,
  REJECTED,
}

class MyPromise<T> {
  status: number;
  result: T | null

  constructor(func) {
    this.status = PromiseStatus.PENDING;
    this.result = null
    func(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(result) {
    if(this.status === PromiseStatus.PENDING) {
        this.status = PromiseStatus.FULLFILLED
        this.result = result
    }
  }

  reject(reason) {
    if(this.status === PromiseStatus.REJECTED) {
        this.status = PromiseStatus.REJECTED
        this.result = reason
    }
  }
}


