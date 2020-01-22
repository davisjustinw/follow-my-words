class Board {
  constructor() {
    // Stanza structure legend
    this.URL = 'http://127.0.0.1:3000'
    this.legend = [
      { count: 5, eos: false },
      { count: 5, eos: true },
      { count: 7, eos: false },
      { count: 7, eos: true },
    ];

    // initialize line values
    this.line = { index: 0, ...this.legend[0] };
    //console.log(this.line);
    // Set DOM Nodes
    this.dom = {
      board: document.querySelector('#gameboard'),
      queue: document.querySelector('#words ul'),
      saved: document.querySelector('#saved'),
      stanza: document.querySelector('#stanza'),
      stanzas: document.querySelector('#stanzas'),
      line: document.querySelector('#stanza p'),
      lineCounter: document.querySelector('#stanza p span')
    };

    this.dom.lineCounter.innerText = this.line.count;
    this.dom.lineCounter.className = 'sakura inStanza';

    //browser dimensions;
    this.client = {
      offset: 50,
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth
    };
    //console.log(this.client);

    //event listeners
    this.setResizeListener();
    this.setQueueListener();
    this.setLineListener();
    this.setPauseListener();

    // build word hash
    this.queue = new Queue(this);
    this.queue.fetchData();

    this.paused = false;
    

  }// END constructor

  // METHODS

  // Add word to current line
  checkAndAddWord(word) {
    let check = Math.sign(this.line.count - word.syllable_count);

    return {
      '1': this.addWord,
      '0': this.addWordNewLine,
      '-1': this.reject
    }[check].bind(this)(word);
    //bind here passes the class context to the lookup object
  }

  addWord(word) {
    //console.log(`addWord: ${word.id}`);
    this.line.count -= word.syllable_count;

    this.queue.moveWordToVerse(word);
    this.dom.lineCounter.innerText = this.line.count;
    word.element.className = 'sakura inStanza';
    this.queue.addWords(1, 50, this.client);
    //console.log(`added to line.`);
  }

  addWordNewLine(word) {
    this.addWord(word);

    // clear the counter
    this.dom.line.removeChild(this.dom.lineCounter);
    this.dropLineListener();
    this.checkSaveStanza();

    this.dom.line = document.createElement('p');
    this.dom.lineCounter = document.createElement('span')

    this.dom.line.appendChild(this.dom.lineCounter);
    this.dom.stanza.appendChild(this.dom.line);
    this.setLineListener();

    let newIndex;

    if(this.line.index != this.legend.length - 1) {
      newIndex = this.line.index + 1;
    } else {
      newIndex = 0;
    }
    this.line = { index: newIndex, ...this.legend[newIndex]};

    this.dom.lineCounter.innerText = this.line.count;
    this.dom.lineCounter.className = 'sakura inStanza';
  }

  reject() {
    console.log('rejected');
  }

  checkSaveStanza() {
    console.log('checkStanza');
    // end of stanza
    if(this.line.eos) {

      this.queue.clearSavedWords()
      this.queue.saveVerseWords()

    }
  }

  dropWord(word) {
    this.queue.moveWordToQueue(word);
    this.line.count += word.syllable_count;
    this.dom.lineCounter.innerText = this.line.count;
    word.element.className = 'sakura';
  }

  destroyAndReplaceWord(word) {
    this.queue.dropWordFromQueue(word);

    if(this.queue.spaceInWords()) {
      this.queue.addWords(1, 50, this.client);
    }
  }

  // Listeners
  lineListener = e => {
    e.stopPropagation();
    if(!this.paused) {
      let dropped = this.queue.findVerseWord(e.target.id);
      dropped && this.dropWord(dropped);
    }
  }

  setLineListener() {
    this.dom.line.addEventListener('click', this.lineListener, true);
  }

  dropLineListener() {
    this.dom.line.removeEventListener('click', this.lineListener,true);
  }

  setPauseListener() {
    document.addEventListener('keydown', e => {
      if(e.key == ' ') {
        this.togglePause();
      }
    }, false);
  }

  setResizeListener() {
    window.addEventListener("resize", e => {
      this.resetPosition = true;
    }, false);
    this.resetPosition = false;
  }

  setQueueListener() {
    this.dom.queue.addEventListener('click', e => {
      e.stopPropagation();
      //console.log(`word in queue clicked: ${e.target.id}`)
      //console.log(this.dom.line);
      if(!this.paused) {
        let clickedWord = this.queue.findWord(e.target.id);

        //the target wasn't always legit this checks for that
        clickedWord && this.checkAndAddWord(clickedWord);
      }

    }, true);
  }

  checkForReset() {
    if (this.resetPosition) {
      this.client = {
        offset: 50,
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth
      };

      for (const word in this.queue.words) {
        this.queue.words[word].update();
      }

      this.resetPosition = false;
    }
  }

  togglePause() {
    this.paused = !this.paused;
    this.dom.queue.hidden = !this.dom.queue.hidden
    this.dom.stanzas.hidden = !this.dom.stanzas.hidden
  }

  clearTimer() {
    clearInterval(this.timer);
  }

  playBack = function() {
    console.log('playing back')
  }

  // move words animates all word in queue.words object
  moveWords() {
    if(!this.paused) {
      for (const word in this.queue.words) {
        this.queue.words[word].update(this.client);
      }
    } else if(this.paused && !this.timer) {
      this.timer = setInterval(this.playBack, 5000);
    }

    this.checkForReset();

    requestAnimationFrame(this.moveWords.bind(this));
  }

} //END Board Class
