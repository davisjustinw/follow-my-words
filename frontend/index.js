
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

    this.line = { count: 0, index: 0, ...this.legend[0] };

    // DOM Nodes
    let stanza = document.querySelector('#stanza');
    this.dom = {
      queue: document.querySelector('#words ul'),
      saved: document.querySelector('#saved'),
      stanza: stanza,
      line: stanza.firstElementChild
    };

    // event listeners
    // word queue listener
    this.dom.queue.addEventListener('click', e => {
      e.stopPropagation();
      console.log(`word in queue clicked: ${e.target.id}`)
      let clickedWord = this.findWord(e.target.id);

      // If there's room in the current line add the word
      if (this.addCount(clickedWord)) {
        this.addWordToLineNode(clickedWord);
        console.log(`new count: ${this.line.count}`)
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
      this.dom.queue.appendChild(newWord.element);
      return words;
    }, {});

  }// END constructor


  findWord(id) {
    console.log(`findWord: ${id}`);
    return this.words[id];
  }

  addWordToLineNode(word) {
    console.log(`addWordToLineNode: ${word.id}`);
    console.log(this.dom.line);
    this.dom.line.appendChild(word.element);
    console.log(`added to line.`)
  }

  addCount(word) {
    console.log(`addCount`);
    if(this.line.count + word.count <= this.line.max) {
      console.log(`word will fit`);
      this.line.count = this.line.count + word.count;
      return true;
    } else {
      return false;
    }
  }

  subtractCount(word){
    console.log(`subtractCount`);
    if(this.line.count - word.count >= 0) {
      this.line.count = this.line.count - word.count;
      return true;
    } else {
      return false;
    }
  }

  // setLineListener gives lexical scope for the event listener to class elements
  // and allows line to shift
  setLineListener() {
    console.log(`setLineListener`);
    this.dom.line.addEventListener('click', e => {
      //find word in list
      let dropped = this.findWord(e.target.id);
      //remove node
      e.currentTarget.removeChild(dropped.element);
      //subtract count

      //return word to queue
    },true);
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
