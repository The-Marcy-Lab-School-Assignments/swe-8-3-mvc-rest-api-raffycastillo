const getId = require('../utils/getId');

class Diary {
  static #entries = [
    {
      id: getId(),
      lastUpdate: new Date(1735689600000),
      text: "start of the year",
      imgSrc: "https://images.dog.ceo/breeds/terrier-australian/n02096294_1470.jpg",
    },
    {
      id: getId(),
      lastUpdate: new Date(1750273200000),
      text: "middle of start of year up until recently",
      imgSrc: "https://images.dog.ceo/breeds/labrador/n02099712_7133.jpg",
    },
    {
      id: getId(),
      lastUpdate: new Date(1761302400000),
      text: "recently",
      imgSrc: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1370.jpg",
    }
  ];

  // Create and add the new fellow to the "database" (the fellows array)
  // Rather than using a constructor, we use a static method to create a new fellow
  static create(text, imgSrc='') {
    const newEntry = {
      id: getId(),
      lastUpdate: new Date(Date.now()),
      text,
      imgSrc,
    }
    Diary.#entries.push(newEntry);
    return newEntry;
  }

  // Get all values from the "database"
  static list() {
    return [...Diary.#entries];
  }

  // Get one value from the "database"
  static find(id) {
    return Diary.#entries.find((entry) => entry.id === id);
  }

  static editEntry(id, text, imgSrc) {
    const entry = Diary.find(id);
    if (!entry) return null;

    if (text) entry.text = text;
    if (imgSrc) entry.imgSrc = imgSrc;
    entry.lastUpdate = new Date(Date.now());

    return entry;
  }

  // Delete one value from the "database"
  static delete(id) {
    const entryIndex = Diary.#entries.findIndex((entry) => entry.id === id);
    if (entryIndex < 0) return false;

    Diary.#entries.splice(entryIndex, 1);
    return true;
  }
}

module.exports = Diary;

/*
Take a moment and play with these class methods. Try the following and
run this file with `node Fellow.js`:

console.log(Fellow.list())
console.log(Fellow.find(1))
console.log(Fellow.editName(1, 'ZO!!'))
console.log(Fellow.delete(2))
console.log(Fellow.list())
*/
