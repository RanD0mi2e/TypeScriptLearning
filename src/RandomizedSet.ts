class RandomizedSet {
  arr: number[];
  map: Map<number, number>;
  results: (boolean | number)[];

  constructor() {
    this.arr = [];
    this.map = new Map();
    this.results = [];
  }

  insert(val: number): boolean {
    if (this.map.has(val)) {
      this.results.push(false)
      return false;
    }
    this.arr.push(val);
    this.map.set(val, this.arr.length - 1);
    this.results.push(true)
    return true;
  }

  remove(val: number): boolean {
    if (!this.map.has(val)) {
      this.results.push(false)
      return false;
    }
    const index = this.map.get(val) as number;
    this.arr[index] = this.arr[this.arr.length - 1];
    this.map.set(this.arr[index], index);
    this.arr.pop();
    this.map.delete(val)
    this.results.push(true)
    return true;
  }

  getRandom(): number {
    const random = Math.floor(Math.random() * this.arr.length);
    this.results.push(random)
    return this.arr[random];
  }
}

var obj = new RandomizedSet();
obj.insert(0);
obj.insert(1);
obj.remove(0);
obj.insert(2);
obj.remove(1);
obj.getRandom();
console.log(obj.results)
