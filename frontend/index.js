
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
    this.el = document.createElement('span');
    this.el.innerText = this.text;
    this.el.setAttribute('id', `word${this.id}`);
  }
}

// A verse line manages proper line syllables
class Line {
  // think about getter setters here to protect vairables?
  constructor(syllableMax) {
    this.max = syllableMax;
    this.words = [];
    this.count = 0;
    this.el = document.createElement('p');
  }

  add = function(word) {
    if (word.count + this.count <= this.max ) {
      this.words.push(word);
      this.count += word.count;
      return true;
    } else {
      return false;
    }
    // maybe return the word or the list not sure here
  }

  drop = function(wordIndex) {
    let dropped = this.words.splice(wordIndex, 1)[0];
    this.count -= dropped.count;
    return dropped;
  }

}

class Board {
  constructor() {
    this.words = getWords().reduce((words, obj) => {
      let newWord = new Word(obj);
      words[newWord.id] = newWord;
      return words;
    }, {});
    this.currentStanza = [new Line(5), new Line(7), new Line(5)];
  }

  saveStanza = function() {
    this.savedStanza = this.currentStanza;
    //POST stanza ?
    if(savedStanza.length == 3) {
        this.currentStanza = [new Line(7), new Line(7)];
    } else {
      this.currentStanza = [new Line(5), new Line(7), new Line(5)];
    }
  }

}


// queueListener
function selectWord(e) {
  e.stopPropagation();
  e.currentTarget.removeChild(e.target);
  stanza = document.querySelector('#stanza1');
  stanza.appendChild(e.target);
}

// stanzaListener

function start() {
  test()
  console.log('loading');
  //build gameboard
  let board = new Board();
  let words = board.words;

  //load Dom
  let queue = document.querySelector('#words ul');
  Object.keys(words).forEach( word => {
    queue.appendChild(words[word].el)
  });

  // load parent event listener
  wordQueue.addEventListener('click', selectWord, true);

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
