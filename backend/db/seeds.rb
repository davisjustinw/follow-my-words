
file = File.open('./lib/Alice_short.txt')
data = file.read
file.close
words = data.scan(/\w+/)

book = Book.create(
  title: "Alice's Adventures in Wonderland",
  author: "Lewis Carroll"
)

words.each do |word|
  newWord = book.words.find_or_initialize_by(
    text: word.downcase,
    syllable_count: Word.count_syllables(word)
  )

  newWord.count_up if newWord.persisted?
  puts "#{newWord.text}: #{newWord.count}"
  newWord.save
end

cannedStanzas = [
  {
    lines_attributes: [
      {text: "spacebar to unpause"},
      {text: "clicking words adds to stanza"},
      {text: "complete lines to save"}
    ]
  },
  {
    lines_attributes: [
      {text: "down the rabbit hole we go"},
      {text: "relax what can we create"}
    ]
  },

]

cannedStanzas.each do |stanza|
  puts 'adding stanza'
  Stanza.create(stanza);
  puts 'stanza successful'
end
