// 1.可选参数
// function buildName(firstName: string, lastName?: string): string {
//   if (lastName) {
//     return firstName + ' ' + lastName
//   }
//   return firstName
// }

// console.log(buildName('Bob'));
// console.log(buildName('John', 'Smith'));

// 2.默认值
// function createName(firstName = 'Smith', lastName: string): string {
//   return firstName + ' ' + lastName
// }

// 带默认值的参数传入undefined意味着使用默认值
// console.log(createName(undefined, 'nikolas'));

// 3.剩余参数
// function mergeName(firstName: string, ...restOfName: string[]): string {
//   return firstName + ' ' + restOfName.join(' ')
// }

// console.log(mergeName('niko', 'bob', 'climen', 'smith', 'john'));

// 4.this指向问题
// let deck = {
//   suits: ["hearts", "spades", "clubs", "diamonds"],
//   cards: Array(52),
//   createCardPicker: function () {
//     // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
//     return () => {
//       let pickedCard = Math.floor(Math.random() * 52);
//       let pickedSuit = Math.floor(pickedCard / 13);

//       return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//     }
//   }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// interface Card {
//   suit: string,
//   card: number
// }

// interface Deck {
//   suits: string[],
//   cards: number[],
//   createCardPicker(this: Deck): () => Card
// }

// let deck: Deck = {
//   suits: ['Spade', 'Heart', 'Clubs', 'Diamond'],
//   cards: Array(52),
//   createCardPicker(this: Deck) {
//     return () => {
//       let pickedCard = Math.floor(Math.random() * 52)
//       let pickedSuit = Math.floor(pickedCard / 13)
//       return {
//         suit: this.suits[pickedSuit],
//         card: pickedCard % 13
//       }
//     }
//   }
// }

// let cardPicker = deck.createCardPicker()
// let pickedCard = cardPicker()

// console.log("card: " + pickedCard.card + " of " + pickedCard.suit)

// this参数在回调函数中
interface UIElement {
  addEventListener(onclick: (this: void, e: Event) => void): void
}

class Handler {
  info: string
  onclickBad = (e: Event) => {
    this.info = e.type
    console.log(this);
  }
}

let h = new Handler()
let uiElement: UIElement
uiElement.addEventListener(h.onclickBad)

// 函数重载
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };
function pickCard(x): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

