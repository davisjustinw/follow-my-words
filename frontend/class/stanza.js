class Stanza {
  constructor(object) {
    this.id = object.id;
    this.lines = object.lines.map(line => line.text);
  }
}
