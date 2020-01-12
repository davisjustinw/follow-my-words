
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


class Board {
  constructor() {
    // Stanza structure
    this.legend = [
      { max: 5, eos: false },
      { max: 7, eos: false },
      { max: 5, eos: true },
      { max: 7, eos: false },
      { max: 7, eos: true },
    ];
    this.index = 0;

    // DOM Nodes
    this.elQueue = document.querySelector('#words ul');
    this.elSavedStanza = document.querySelector('#saved-stanza');
    this.elCurrentStanza = document.querySelector('#current-stanza');
    //currentLine

    // Event listeners
      // queue Listener
      // currentLine Listener

    // Build Word hash
    this.words = getWords().reduce((words, obj) => {
      let newWord = new Word(obj);
      words[newWord.id] = newWord;
      this.elQueue.appendChild(newWord.element);
      return words;
    }, {});

  }// END constructor

  finishLine = function() {

  }

  saveStanza = function() {

  }

} //END Board Class


/////***** Fire up *****/////
function start() {
  console.log('loading');
  let board = new Board();
  console.log('starting');
}

window.addEventListener("DOMContentLoaded", start(), false);
