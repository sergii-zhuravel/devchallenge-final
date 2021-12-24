export class Variable {
  constructor(name, src, id) {
    this.name = name;
    this.src = src;
    this.id = id;
  }
}

export const variables = [
  new Variable("dog", "./images/dog.png", 1),
  new Variable("cat", "./images/cat.png", 2),
  new Variable("horse", "./images/horse.png", 3),
  new Variable("hen", "./images/chicken.png", 4),
  new Variable("cow", "./images/cow.png", 5),
];

export const operations = ["+", "-", "*", "/", "=", "?"];

export const questionMark = "?";

export const MAX_EXPRESSIONS_NUMBER = 6;
