class Queue {
  constructor(board) {
    this.data = [];
    this.words = {};
    this.verseWords = {};
    this.stanzaToSave = [];
    this.maxWords = 14;
    this.board = board;
  }

  get length() {
    return this.data.length;
  }

  spaceInWords() {
    if(Object.keys(this.words).length < this.maxWords){
      //console.log(`space in words ${Object.keys(this.words).length}: ${this.maxWords}`);
      return true;
    } else {
      //console.log(`no space in words ${Object.keys(this.words).length}: ${this.maxWords}`);
      return false;
    }
  }

  clearSavedWords() {
    let oldChildren = [].slice.call(this.board.dom.saved.children);

    for(let child of oldChildren) {
      this.buildLineToSave(child);
      this.board.dom.saved.removeChild(child);
    }
    this.commitStanza();
  }

  commitStanza() {
    if(this.stanzaToSave.length != 0) {
      console.log('commit');
      console.log(this.stanzaToSave);

      let requestBody = JSON.stringify({
        "stanza" : {
          "lines_attributes" : this.stanzaToSave
        }
      });
      console.log('fetch');
      fetch( 'http://127.0.0.1:3000/stanzas', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: requestBody
        })
        .then( response => {
          return response.json();
        })
        .then( object => {
          console.log(object);
          this.board.stanzas.push(new Stanza(object));
        })
        .catch( error => {
          //document.body.innerHTML = error.message;
          console.log(error.message);
        })

      this.stanzaToSave = [];
    }

  }

  buildLineToSave(element) {
    let children = [].slice.call(element.children);
    let line = '';
    for(let child of children) {
      line = `${line}${child.innerText} `;
    }
    this.stanzaToSave.push({ text: line.trim() });
  }

  saveVerseWords() {
    let newChildren = [].slice.call(this.board.dom.stanza.children);
    this.board.dom.saved.append(...newChildren);
  }

  moveWordToVerse(word) {
    this.verseWords[word.id] = word;
    word.element.style.opacity = 100;
    this.board.dom.line.insertBefore(word.element, this.board.dom.lineCounter);
    delete this.words[word.id];
  }

  moveWordToQueue(word) {
    this.words[word.id] = word;
    word.setOpacity();
    word.setPosition();
    this.board.dom.queue.appendChild(word.element);
    delete this.verseWords[word.id];
  }

  dropWordFromQueue(word) {
    this.board.dom.queue.removeChild(word.element);
    delete this.words[word.id];
  }

  addWords(count) {
    for(let i = 0; i < count; i++){
      let random = Math.floor(Math.random() * this.data.length);

      let word = new Word(this.data[random], this.board);

      this.words[word.id] = word;

      if(this.data[random].count > 0) {
        this.data[random].count = this.data[random].count - 1;
      } else {
        this.data.splice(random, 1);
      }
    }
    return words;
  }

  findWord(id) {
    //console.log(`findWord: ${id}`);
    return this.words[id];
  }

  findVerseWord(id) {
    //console.log(`findVerseWord: ${id}`);
    return this.verseWords[id];
  }
  //API Call
  fetchData() {
    //console.log('fetching words')
    fetch(`${this.board.URL}/books/1/words`)
      .then(response => response.json())
      .then(json => {
        //console.log('fetched');
        this.data = [...this.data, ...json];
        this.addWords(this.maxWords);
      });
  }
}
