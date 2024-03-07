function mockAvatarImg(uid: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`UserAvatar-${uid}`);
      resolve(`UserAvatar-${uid}`);
    }, 1000);
  });
}

// TODO
type SomeRequestAdapter = <R>(cb: <T>(qm: RequestAdapter<T>) => R) => R;
const someRequestAdapter = <T>(qm: RequestAdapter<T>): SomeRequestAdapter => ((cb) => cb(qm));

type RequestAdapter<T> = {
  requestFn: () => Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason: any) => void;
};

class AsyncLimitedQueue {
  #limited = 6;
  #waitingQueue: Array<SomeRequestAdapter> = [];

  constructor(num: number) {
    this.#limited = num ?? this.#limited;
  }

  inQueue<T>(request: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.#waitingQueue.push(
        someRequestAdapter({
          requestFn: request,
          resolve,
          reject,
        })
      );

      this.execTaskFromQueue();
    });
  }

  execTaskFromQueue() {
    if (this.#limited === 0 || this.#waitingQueue.length === 0) return;
    const sqm = this.#waitingQueue.shift()!;
    sqm(({ requestFn, resolve, reject }) => {
      this.#limited--;
      requestFn()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.#limited++;
          this.execTaskFromQueue();
        });
    });
  }
}

async function loadAvatar() {
  const start = Date.now();
  const uid = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const queue = new AsyncLimitedQueue(5);
  const avatar = await Promise.all(
    uid.map((id) => queue.inQueue(() => mockAvatarImg(id)))
  );
  console.log(
    new Date().getTime() - start > 2000 && new Date().getTime() - start < 3000,
    avatar
  );
}

loadAvatar();
