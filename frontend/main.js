// Fetch the next words
// will need syllables
const getWords = () => {
  console.log('getting words')
  let wordString = "Alice was beginning to get very tired of sitting by her sister on the bank";
  let words = wordString.split(" ");

  return words;
}

export { getWords };
