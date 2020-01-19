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
