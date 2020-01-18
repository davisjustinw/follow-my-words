
// Represents a word with syllable count
class Word {
  constructor(obj) {
    this.id = `${obj.id}-${obj.count}`;
    this.text = obj.text;
    this.syllable_count = obj.syllable_count;
    this.element = document.createElement('span');
    this.element.innerText = `${this.text} `;
    this.element.setAttribute('id', this.id);
  }
}

class Queue {
  constructor(dom) {
    this.data = [];
    this.words = {};
    this.dom = dom;
  }

  get length() {
    return this.data.length;
  }

  addWords(count) {
    for(let i = 0; i < count; i++){
      let random = Math.floor(Math.random() * this.data.length);
      let word = new Word(this.data[random]);

      this.words[word.id] = word;
      this.dom.appendChild(word.element);

      if(this.data[random].count > 0) {
        this.data[random].count = this.data[random].count - 1;
      } else {
        this.data.splice(random, 1);
      }
    }
    return words;
  }

  findWord(id) {
    console.log(`findWord: ${id}`);
    return this.words[id];
  }
  //API Call
  fetchData() {
    console.log('fetching words')
    fetch('http://127.0.0.1:3000/books/1/words')
      .then(response => response.json())
      .then(json => {
        console.log('fetched');
        this.data = [...this.data, ...json];
        this.addWords(50);
      });
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
    this.dom = {
      queue: document.querySelector('#words ul'),
      saved: document.querySelector('#saved'),
      stanza: document.querySelector('#stanza'),
      line: document.querySelector('#stanza p'),
      lineCounter: document.querySelector('#stanza p span')
    };
    this.dom.lineCounter.innerText = `${this.line.count}: `;

    // event listeners
    // word queue listener
    this.dom.queue.addEventListener('click', e => {
      e.stopPropagation();
      console.log(`word in queue clicked: ${e.target.id}`)
      console.log(this.dom.line);
      let clickedWord = this.queue.findWord(e.target.id);

      //the target wasn't always legit this checks for that
      clickedWord && this.checkAndAddWord(clickedWord);
    }, true);

    // current line listener
    this.setLineListener();

    // build word hash
    this.queue = new Queue(this.dom.queue);
    this.queue.fetchData();

  }// END constructor

  checkAndAddWord(word) {
    let check = Math.sign(this.line.count - word.syllable_count);
    console.log(`checking: ${this.line.count} - ${word.syllable_count}`);
    return {
      '1': this.addWord,
      '0': this.addWordNewLine,
      '-1': this.reject
    }[check].bind(this)(word);
    //bind here passes the class context to the lookup object
  }

  reject() {
    console.log('rejected');
  }

  addWord(word) {
    console.log(`addWord: ${word.id}`);
    this.line.count -= word.syllable_count;
    this.dom.line.appendChild(word.element);
    this.dom.lineCounter.innerText = `${this.line.count}: `
    console.log(`added to line.`);
  }

  addWordNewLine(word) {
    console.log('add and complete');
    this.addWord(word);
    this.queue.addWords(this.legend[this.line.index].count);
    console.log('completed line');

    this.checkSaveStanza();
    this.dropLineListener();

    this.dom.line = document.createElement('p');
    this.dom.lineCounter = document.createElement('span')

    this.dom.line.appendChild(this.dom.lineCounter);
    this.dom.stanza.appendChild(this.dom.line);
    this.setLineListener();

    let newIndex;
    if(this.line.index != this.legend.length) {
      newIndex = this.line.index + 1;
    } else {
      newIndex = 0;
    }
    this.line = { index: newIndex, ...this.legend[newIndex]}
    this.dom.lineCounter.innerText = `${this.line.count}: `;
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
    this.line.count += word.syllable_count;
    this.dom.lineCounter.innerText = `${this.line.count}: `
    console.log(`added to queue.`)
  }

  lineListener = e => {
      e.stopPropagation();
      //find word in list
      let dropped = this.queue.findWord(e.target.id);
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
