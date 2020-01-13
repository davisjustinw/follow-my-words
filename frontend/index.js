
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
    { text: 'bank', count: 1, id: 'word-15' },
    { text: 'Alice', count: 2, id: 'word-16' },
    { text: 'was', count: 1, id: 'word-17' },
    { text: 'beginning', count: 3, id: 'word-18' },
    { text: 'to', count: 1, id: 'word-19' },
    { text: 'get', count: 1, id: 'word-20' },
    { text: 'very', count: 2, id: 'word-21' },
    { text: 'tired', count: 1, id: 'word-22' },
    { text: 'of', count: 1, id: 'word-23' },
    { text: 'sitting', count: 2, id: 'word-24' },
    { text: 'by', count: 1, id: 'word-25' },
    { text: 'her', count: 1, id: 'word-26' },
    { text: 'sister', count: 2, id: 'word-27' },
    { text: 'on', count: 1, id: 'word-28' },
    { text: 'the', count: 1, id: 'word-29' },
    { text: 'bank', count: 1, id: 'word-30' }
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

class Queue {
  constructor() {
    this.data = [];
    this.min = 10;
    this.getData();
  }

  getWords(count) {
    if(count < this.data.length && this.data.length > this.min) {
      return this.data.splice(0,count);
    } else {
      this.getData();
      return this.getWords(count);
    }
  }
  //API Call
  getData() {
    this.data = [...this.data, ...getWords()];
  }
}

class Board {
  constructor() {
    // Stanza structure
    this.legend = [
      { count: 5, eos: false },
      { count: 7, eos: false },
      { count: 5, eos: true },
      { count: 7, eos: false },
      { count: 7, eos: true },
    ];

    this.line = { index: 0, ...this.legend[0] };
    this.words = {};

    // DOM Nodes
    this.dom = {
      queue: document.querySelector('#words ul'),
      saved: document.querySelector('#saved'),
      stanza: document.querySelector('#stanza'),
      line: document.querySelector('#stanza').firstElementChild
    };

    // event listeners
    // word queue listener
    this.dom.queue.addEventListener('click', e => {
      e.stopPropagation();
      console.log(`word in queue clicked: ${e.target.id}`)
      console.log(this.dom.line);
      let clickedWord = this.findWord(e.target.id);
      clickedWord && this.checkAndAddWord(clickedWord);
    }, true);

    // current line listener
    this.setLineListener();

    // build word hash
    this.queue = new Queue();
    this.loadWords(15);

  }// END constructor

  loadWords(count) {
    console.log('loadWords');
    console.log(this.words);
    this.words = this.queue.getWords(count).reduce((words, obj) => {
      let newWord = new Word(obj);
      words[newWord.id] = newWord;
      this.dom.queue.appendChild(newWord.element);
      return words;
    }, this.words)
  }

  findWord(id) {
    console.log(`findWord: ${id}`);
    return this.words[id];
  }

  checkAndAddWord(word) {
    let check = Math.sign(this.line.count - word.count);
    console.log(`checking: ${this.line.count} - ${word.count}`);
    return {
      '1': this.addWord,
      '0': this.addWordNewLine,
      '-1': this.reject
    }[check].bind(this)(word);
  }

  reject() {
    console.log('rejected');
  }

  addWord(word) {
    console.log(`addWord: ${word.id}`);
    this.line.count -= word.count;
    this.dom.line.appendChild(word.element);
    console.log(`added to line.`);
  }

  addWordNewLine(word) {
    console.log('add and complete');
    this.addWord(word);
    this.loadWords(this.legend[this.line.index].count);
    //line is complete
    console.log('completeLine');
    this.checkSaveStanza();
    this.dropLineListener();
    this.dom.line = document.createElement('p');
    this.dom.stanza.appendChild(this.dom.line);
    this.setLineListener();

    let newIndex;
    if(this.line.index != this.legend.length) {
      newIndex = this.line.index + 1;
    } else {
      newIndex = 0;
    }
    this.line = { index: newIndex, ...this.legend[newIndex]}

  }

  checkSaveStanza() {
    console.log('checkStanza');
    console.log(`end of stanza: ${this.line.eos}`)
    if(this.line.eos) {
      let children = this.dom.stanza.childNodes;
      console.log(children);
      this.dom.saved.append(...children);
    }
  }

  dropWord(word) {
    console.log(`addWordToQueueNode: ${word.id}`);
    console.log(this.dom.queue);
    this.dom.queue.appendChild(word.element);
    this.line.count += word.count;
    console.log(`added to queue.`)
  }

  lineListener = e => {
      e.stopPropagation();
      //find word in list
      let dropped = this.findWord(e.target.id);
      //remove node
      dropped && this.dropWord(dropped);
  }

  // setLineListener gives lexical scope for the event listener to class elements
  // and allows line to shift
  setLineListener() {
    console.log(`setLineListener`);
    this.dom.line.addEventListener('click', this.lineListener,true);
  }

  dropLineListener() {
    console.log('drop line listener');
    this.dom.line.removeEventListener('click', this.lineListener,true);
  }


} //END Board Class


/////***** Fire up *****/////
function start() {
  console.log('loading');
  let board = new Board();
  console.log('starting');
}

window.addEventListener("DOMContentLoaded", start(), false);
