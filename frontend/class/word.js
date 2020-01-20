class Word {
  constructor(obj, offset, size) { //when do I call this? with offset, size
    // metadata
    this.id = `${obj.id}-${obj.count}`;
    this.text = obj.text;
    this.syllable_count = obj.syllable_count;

    // dom variables
    this.element = document.createElement('span');
    this.element.innerText = this.text;
    this.element.setAttribute('id', this.id);
    this.element.setAttribute('class', 'sakura');

    // position
    this.speed = 5 + Math.random() * 40;

    this.position = {x: null, y: null};

    console.log(`before setPosition. offset ${offset}, size ${size}`);
    this.setPosition(offset, size);
    this.scale = 1;
    console.log(`${this.id}: start position ${this.position.x}, ${this.position.y}`);
    // motion
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;

    // initial opacity
    // might need to do this with setAttribute
    this.element.style.opacity = (.9 + Math.random()) / 3;
  }

  update(boardSize) {
    //console.log(`boardSize: ${boardSize.width}, ${boardSize.height}`);
    // using some trigonometry to determine our x and y position
    this.counter += this.speed / 5000;
    this.position.x += this.sign * this.speed * Math.cos(this.counter) / 40;
    this.position.y += Math.sin(this.counter) / 40 + this.speed / 30;
    this.scale = .5 + Math.abs(10 * Math.cos(this.counter) / 20);

    // setting word position
    this.setTransform(
      Math.round(this.position.x),
      Math.round(this.position.y),
      this.scale,
      this.element
    );

    // if word drops below browser window, return to top
    if (this.position.y > boardSize.height) {
      this.position.y = -50;
    }
  }

  calculatePosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
  }
  setPosition(offset, size) {
    console.log(`setPosition. offset ${offset}, size ${size}`);

    this.position.x = this.calculatePosition(offset, size.width);
    this.position.y = this.calculatePosition(offset, size.height);
  }

  setTransform() {
    this.element.style.transform =
      `translate3d(${this.position.x}px, ${this.position.y}px, 0) scale(${this.scale}, ${this.scale})`;
  }
}
