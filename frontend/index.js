
// getWords will fetch words from the API
function getWords() {
  console.log('getting words')
  let words = [
    { text: 'Alice', count: 2, id: 'word-1' },
    { text: 'was', count: 1, id: 'word-2' },
    { text: 'beginning', count: 3, id: 'word-3' },
    { text: 'to', count: 1, id: 'word-4' },
    { text: 'get', count: 1, id: 'word-5' },
    { text: 'very', count: 2, id: 'word-6' },
    { text: 'tired', count: 1, id: 'word-7' },
    { text: 'of', count: 1, id: 'word-8' },
    { text: 'sitting', count: 2, id: 'word-9' },
    { text: 'by', count: 1, id: 'word-10' },
    { text: 'her', count: 1, id: 'word-11' },
    { text: 'sister', count: 2, id: 'word-12' },
    { text: 'on', count: 1, id: 'word-13' },
    { text: 'the', count: 1, id: 'word-14' },
    { text: 'bank', count: 1, id: 'word-15' }
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
    this.element.setAttribute('id', this.id);
  }
}

// A verse line manages proper line syllables
class Line {
  constructor(syllableMax) {
    this.max = syllableMax;
    this.words = {};
    this.count = 0;
    this.complete = false;
    this.element = document.createElement('p');
  }

  add = function(word) {
    if (word.count + this.count <= this.max ) {
      this.words[word.id] = word;
      this.count += word.count;

      if (this.count == this.max) { this.complete == true };

      this.element.appendChild(word.element);
      console.log(this.words);
      return true;
    } else {
      return false;
    }
    // maybe return the word or the list not sure here
  }

  drop = function(wordId) {
    console.log(`drop ${wordId}`)
    let dropped = this.words[wordId];
    console.log(this.words);
    console.log(dropped);
    delete this.words[dropped];
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
    this.currentLine = this.lines[0];

  }

  length = function() {
    return this.lines.length;
  }

}

class Board {
  constructor() {
    this.elQueue = document.querySelector('#words ul');
    this.elCurrentStanza = document.querySelector('#current-stanza');
    this.elSavedStanza = document.querySelector('#saved-stanza');
    this.currentStanza = new Stanza([5,7,5], this.elCurrentStanza);

    this.elQueue.addEventListener('click', e => {
      e.stopPropagation();
      e.currentTarget.removeChild(e.target);
      this.elCurrentStanza.appendChild(e.target);
      let id = e.target.getAttribute('id');
      let word = this.words[id];
      console.log(this.currentStanza.currentLine);
      this.currentStanza.currentLine.add(word);
      console.log(this.currentStanza.currentLine);
    }, true);

    this.words = getWords().reduce((words, obj) => {
      let newWord = new Word(obj);
      words[newWord.id] = newWord;
      this.elQueue.appendChild(newWord.element);
      return words;
    }, {});

    this.currentStanza.element.addEventListener('click', e => {

      let pNode = e.target.parentNode.firstChild;
      e.target.parentNode.removeChild(pNode);
      let id = e.target.getAttribute('id');
      let dropped = this.currentStanza.currentLine.drop(id);
      console.log('dropped');
      console.log(dropped);
      console.log('end');
      this.words[dropped.id] = dropped
      this.elQueue.appendChild(dropped.element);
      // return dropped to the queue;
    }, true);

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

function start() {
  test()
  console.log('loading');

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
  console.log(`drop a word by index and return correct word: ${line1.drop('word-1').text == 'beginning'}`);
  console.log(`line after drop shows proper count: ${line1.count == 2}`);

}


/////***** Fire up *****/////
window.addEventListener("DOMContentLoaded", start(), false);
