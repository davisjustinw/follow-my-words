
// getWords will fetch words from the API
function getWords() {
  console.log('getting words')
  let words = [
    { str: 'Alice', syl: 2 },
    { str: 'was', syl: 1 },
    { str: 'beginning', syl: 3 },
    { str: 'to', syl: 1 },
    { str: 'get', syl: 1 },
    { str: 'very', syl: 2 },
    { str: 'tired', syl: 2 },
    { str: 'of', syl: 1 },
    { str: 'sitting', syl: 2 },
    { str: 'by', syl: 1 },
    { str: 'her', syl: 1 },
    { str: 'sister', syl: 2 },
    { str: 'on', syl: 1 },
    { str: 'the', syl: 1 },
    { str: 'bank', syl: 1 }
  ];
  return words;
}

class Word {
  constructor(obj) {
    this.str = obj.str;
    this.syl = obj.syl;
  }
}

function loadAndStart() {
  console.log('loading');
  let wordData = getWords();
  let words = wordData.map(obj => new Word(obj));

  console.log(words[0]);
  console.log('starting');
}
window.addEventListener("DOMContentLoaded", loadAndStart(), false);
