class Stanza {
  constructor(object) {
    this.id = object.id;
    this.lines = object.lines.map(line => line.text);
  }

  getElement() {
    let stanza = document.createDocumentFragment();;
    for(let line of this.lines) {
      let p = document.createElement('p');
      let span = document.createElement('span');
      span.className = 'sakura inStanza';
      span.innerText = line;
      p.appendChild(span)
      stanza.appendChild(p);
    }
    return stanza;
  }
}
