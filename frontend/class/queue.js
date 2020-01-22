class Queue {
  constructor(board) {
    this.data = [];
    this.words = {};
    this.verseWords = {};
    this.savedWords = {};
    this.maxWords = 10;
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
      console.log(child);
      this.board.dom.saved.removeChild(child);
    }
    this.savedWords = {};
  }

  saveVerseWords() {
    let newChildren = [].slice.call(this.board.dom.stanza.children);
    this.board.dom.saved.append(...newChildren);
    this.savedWords = {...this.verseWords};
  }

  moveWordToVerse(word) {
    this.verseWords[word.id] = word;
    this.board.dom.line.insertBefore(word.element, this.board.dom.lineCounter);
    delete this.words[word.id];
  }

  moveWordToQueue(word) {
    this.words[word.id] = word;
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

      // need offset and size
      //console.log("addWOrds");
      //console.log(this.board);
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
