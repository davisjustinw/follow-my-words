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
      board: document.querySelector('#gameboard'),
      queue: document.querySelector('#words ul'),
      saved: document.querySelector('#saved'),
      stanza: document.querySelector('#stanza'),
      line: document.querySelector('#stanza p'),
      lineCounter: document.querySelector('#stanza p span')
    };

    this.dom.lineCounter.innerText = `${this.line.count}:`;
    this.dom.lineCounter.className = 'sakura inStanza';

    // could be done in css but useful to make accessible?
    this.dom.board.style.display = "block";

    //browser dimensions;
    this.size = {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth
    };

    //for browser size reset;
    this.resetPosition = false;

    // event listeners
    //resize listener
    window.addEventListener("resize", e => {
      this.resetPosition = true;
    }, false);

    // word queue listener
    this.dom.queue.addEventListener('click', e => {
      e.stopPropagation();
      console.log(`word in queue clicked: ${e.target.id}`)
      //console.log(this.dom.line);
      let clickedWord = this.queue.findWord(e.target.id);

      //the target wasn't always legit this checks for that
      clickedWord && this.checkAndAddWord(clickedWord);
    }, true);

    // current line listener
    this.setLineListener();

    // build word hash
    this.queue = new Queue(this.dom.queue, this);
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
    this.queue.moveWordToVerse(word);
    this.dom.lineCounter.innerText = this.line.count;
    word.element.className = 'sakura inStanza';
    console.log(`added to line.`);
  }

  addWordNewLine(word) {
    console.log('add and complete');
    this.addWord(word);
    console.log(`before addWords: ${this.size}`)
    this.queue.addWords(this.legend[this.line.index].count, 50, this.size);
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
    this.dom.lineCounter.innerText = this.line.count;
    this.dom.lineCounter.className = 'sakura inStanza';
  }

  checkSaveStanza() {
    console.log('checkStanza');
    console.log(`end of stanza: ${this.line.eos}`)
    if(this.line.eos) {
      let children = this.dom.stanza.childNodes;
      this.dom.saved.append(...children);
    }
  }

  dropWord(word) {
    console.log(`addWordToQueueNode: ${word.id}`);
    console.log(this.dom.queue);
    this.dom.queue.appendChild(word.element);
    this.queue.moveWordToQueue(word);
    this.line.count += word.syllable_count;
    this.dom.lineCounter.innerText = this.line.count;
    word.element.className = 'sakura';
    console.log(`added to queue.`)
  }

  lineListener = e => {
      e.stopPropagation();
      //find word in list
      console.log('line word clicked');
      let dropped = this.queue.findVerseWord(e.target.id);
      console.log(`dropped: ${dropped.id}`);
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

  moveWords() {
    for (const word in this.queue.words) {
      this.queue.words[word].update(this.size);
    }

    if (this.resetPosition) {
      this.size = {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth
      };
      console.log(`reset ${this.size.width}, ${this.size.height}`);
      for (const word in this.queue.words) {
        this.queue.words[word].update(this.size);
      }

      this.resetPosition = false;
    }

    requestAnimationFrame(this.moveWords.bind(this));
  }

} //END Board Class
