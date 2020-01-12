
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
  // maybe get words static
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
    this.legendIndex = 0;
    this.syllableCount = 0;

    // DOM Nodes
    this.queueNode = document.querySelector('#words ul');
    this.savedNode = document.querySelector('#saved');
    this.stanzaNode = document.querySelector('#stanza');
    this.lineNode = this.stanzaNode.firstElementChild;

    // event listeners
    // word queue listener
    this.queueNode.addEventListener('click', e => {
      console.log(`word in queue clicked: ${e.target.id}`)
      let clickedWord = this.findWord(e.target.id);

      // If there's room in the current line add the word
      if (clickedWord.count + this.syllableCount <= this.currentMax) {
        console.log(`word will fit: ${clickedWord.count} + ${this.syllableCount}`);
        this.addWordToLineNode(clickedWord);
        this.syllableCount += clickedWord.count;
        console.log(`new count: ${this.syllableCount}`)
      } else {
        // trigger something ?
      }
    }, true);

    // current line listener
    this.setLineListener();

    // build word hash
    this.words = getWords().reduce((words, obj) => {
      let newWord = new Word(obj);
      words[newWord.id] = newWord;
      this.queueNode.appendChild(newWord.element);
      return words;
    }, {});

  }// END constructor

   get currentMax() {
    console.log(`currentMax: ${this.legend[this.legendIndex].max}`);
    return this.legend[this.legendIndex].max
  }

  findWord(id) {
    console.log(`findWord: ${id}`);
    return this.words[id];
  }

  addWordToLineNode(word) {
    console.log(`addWordToLineNode: ${word.id}`);
    console.log(this.lineNode);
    this.lineNode.appendChild(word.element);
    console.log(`added to line.`)
  }

  setLineListener() {
    console.log(`setLineListener`);
  }

  completeLine() {
    console.log(`completeLine`);
  }

  saveStanza() {
    console.log(`saveStanza`);
  }

} //END Board Class


/////***** Fire up *****/////
function start() {
  console.log('loading');
  let board = new Board();
  console.log('starting');
}

window.addEventListener("DOMContentLoaded", start(), false);
