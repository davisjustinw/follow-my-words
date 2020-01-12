
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
      { count: 5, eos: false },
      { count: 7, eos: false },
      { count: 5, eos: true },
      { count: 7, eos: false },
      { count: 7, eos: true },
    ];

    this.line = { index: 0, ...this.legend[0] };

    // DOM Nodes
    this.stanza = document.querySelector('#stanza');
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
      this.checkAndAddWord(clickedWord);
    }, true);

    // current line listener
    this.setLineListener();

    // build word hash
    this.words = getWords().reduce((words, obj) => {
      let newWord = new Word(obj);
      words[newWord.id] = newWord;
      this.dom.queue.appendChild(newWord.element);
      return words;
    }, {});

  }// END constructor


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

    console.log('completeLine');
    // end of stanza?
      //yes save stanza, => move stanza children to saved

    //new line => append p to stanza point line to it
    //advance index
    //reset line object
  }

  dropWord(word) {
    console.log(`addWordToQueueNode: ${word.id}`);
    console.log(this.dom.queue);
    this.dom.queue.appendChild(word.element);
    this.line.count += word.count;
    console.log(`added to queue.`)
  }



  // setLineListener gives lexical scope for the event listener to class elements
  // and allows line to shift
  setLineListener() {
    console.log(`setLineListener`);
    this.dom.line.addEventListener('click', e => {
      e.stopPropagation();
      //find word in list
      let dropped = this.findWord(e.target.id);
      //remove node
      this.dropWord(dropped);

    },true);
  }


} //END Board Class


/////***** Fire up *****/////
function start() {
  console.log('loading');
  let board = new Board();
  console.log('starting');
}

window.addEventListener("DOMContentLoaded", start(), false);
