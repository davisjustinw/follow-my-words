class Stanza {
  constructor(object) {
    this.id = object.id;
    this.lines = object.lines.map(line => line.text);
  }

  getElement() {
    let stanza = document.createDocumentFragment();;
    for(let line of this.lines) {
      let element = document.createElement('p');
      element.innerText = line;
      element.className = 'sakura';
      stanza.appendChild(element);
    }
    return stanza;
  }
}
