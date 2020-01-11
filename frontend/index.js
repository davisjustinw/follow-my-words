
// getWords will fetch words from the API
function getWords() {
  console.log('getting words')
  let words = [
    { text: 'Alice', count: 2, id: 1 },
    { text: 'was', count: 1, id: 2 },
    { text: 'beginning', count: 3, id: 3 },
    { text: 'to', count: 1, id: 4 },
    { text: 'get', count: 1, id: 5 },
    { text: 'very', count: 2, id: 6 },
    { text: 'tired', count: 1, id: 7 },
    { text: 'of', count: 1, id: 8 },
    { text: 'sitting', count: 2, id: 9 },
    { text: 'by', count: 1, id: 10 },
    { text: 'her', count: 1, id: 11 },
    { text: 'sister', count: 2, id: 12 },
    { text: 'on', count: 1, id: 13 },
    { text: 'the', count: 1, id: 14 },
    { text: 'bank', count: 1, id: 15 }
  ];
  return words;
}

// Represents a word with syllable count
class Word {
  constructor(obj) {
    this.id = obj.id;
    this.text = obj.text;
    this.count = obj.count;
    this.element = document.createElement('span');
    this.element.innerText = `${this.text} `;
    this.element.setAttribute('id', `word${this.id}`);
  }
}

// A verse line manages proper line syllables
class Line {
  constructor(syllableMax) {
    this.max = syllableMax;
    this.words = [];
    this.count = 0;
    this.element = document.createElement('p');
  }

  add = function(word) {
    if (word.count + this.count <= this.max ) {
      this.words.push(word);
      this.count += word.count;
      this.element.appendChild(word.element);
      return true;
    } else {
      return false;
    }
    // maybe return the word or the list not sure here
  }

  drop = function(wordIndex) {
    let dropped = this.words.splice(wordIndex, 1)[0];
    this.count -= dropped.count;
    this.element.removeChild(dropped.element);
    return dropped;
  }

}

class Stanza {
  constructor(structure, element) {
    this.element = element;
    this.lines = structure.map(count => {
      let newLine = new Line(count);
      this.element.appendChild(newLine.element);
      return newLine;
    });
  }

  length = function() {
    return this.lines.length;
  }

}

class Board {
  constructor() {
    this.elQueue = document.querySelector('#words ul');
    this.elQueue.addEventListener('click', selectWord, true);

    this.words = getWords().reduce((words, obj) => {
      let newWord = new Word(obj);
      words[newWord.id] = newWord;
      this.elQueue.appendChild(newWord.element);

      return words;
    }, {});

    this.elCurrentStanza = document.querySelector('#current-stanza');
    this.currentStanza = new Stanza([5,7,5], this.elCurrentStanza);

    this.elSavedStanza = document.querySelector('#saved-stanza');

  }

  saveStanza = function() {
    this.elSavedStanza = this.currentStanza.element;
    //POST stanza;
    if(currentStanza.length == 3) {
        this.currentStanza = new Stanza([7,7]);
    } else {
      this.currentStanza = new Stanza([5,7,5]);
    }
  }

}


// queueListener
function selectWord(e) {
  e.stopPropagation();
  e.currentTarget.removeChild(e.target);
  stanza = document.querySelector('#current-stanza');
  stanza.appendChild(e.target);
}

// stanzaListener

function start() {
  test()
  console.log('loading');
  //build gameboard
  let board = new Board();

  console.log('starting');
}

/////***** Test Function *****/////

function test() {
  words = getWords();

  word1 = new Word(words[0]);
  word2 = new Word(words[2]);
  word3 = new Word(words[6]);
  word4 = new Word(words[7]);
  word5 = new Word(words[11]);
  console.log(`Alice's word class name: ${word1.constructor.name}`);
  console.log(`Alice's word returns proper count of 2: ${word1.count == 2}`);

  line1 = new Line(5);
  line2 = new Line(7);
  console.log(`line1 class name: ${line1.constructor.name}`);

  console.log(`add a word to line with proper count: ${line1.add(word1)}`);
  console.log(`line count after addition is 2: ${line1.count == 2}`);
  console.log(`fill a line: ${line1.add(word2)}`);
  console.log(`line count after addition is 5: ${line1.count == 5}`);
  console.log(`reject any additional words: ${line1.add(word3) == false}`);
  console.log(`drop a word by index and return correct word: ${line1.drop(1).text == 'beginning'}`);
  console.log(`line after drop shows proper count: ${line1.count == 2}`);

}


/////***** Fire up *****/////
window.addEventListener("DOMContentLoaded", start(), false);
