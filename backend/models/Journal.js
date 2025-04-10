const getId = require('../utils/getId');

class Journal {
  static #entries = [
    {
      id: getId(),
      lastUpdate: new Date(1735689600000).toLocaleString(),
      text: "at the start of the year, i got to marvel at the beauty of this australian terrier. i love dogs...",
      imgSrc: "https://images.dog.ceo/breeds/terrier-australian/n02096294_1470.jpg",
    },
    {
      id: getId(),
      lastUpdate: new Date(1750273200000).toLocaleString(),
      text: "i don't know what breed of dog this is. it reminds me of the one we used to have when i was a kid.",
      imgSrc: "https://images.dog.ceo/breeds/labrador/n02099712_7133.jpg",
    },
    {
      id: getId(),
      lastUpdate: new Date(1761302400000).toLocaleString(),
      text: "TIL there's a dog breed called afghan hound. Very cool.",
      imgSrc: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1370.jpg",
    }
  ];

  static create(text, imgSrc='') {
    const newEntry = {
      id: getId(),
      lastUpdate: new Date(Date.now()).toLocaleString(),
      text,
      imgSrc,
    }
    Journal.#entries.push(newEntry);
    return newEntry;
  }

  static list() {
    return [...Journal.#entries].map((entry) => {
      return {
        id: entry.id,
        lastUpdate: entry.lastUpdate,
      };
    });
  }

  static find(id) {
    return Journal.#entries.find((entry) => entry.id === id);
  }

  static editEntry(id, text, imgSrc) {
    const entry = Journal.find(id);
    if (!entry) return null;

    if (text) entry.text = text;
    if (imgSrc) entry.imgSrc = imgSrc;
    entry.lastUpdate = new Date(Date.now()).toLocaleString();

    return entry;
  }

  static delete(id) {
    const entryIndex = Journal.#entries.findIndex((entry) => entry.id === id);
    if (entryIndex < 0) return false;

    Journal.#entries.splice(entryIndex, 1);
    return true;
  }
}

module.exports = Journal;
