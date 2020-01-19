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
