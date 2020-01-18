
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
