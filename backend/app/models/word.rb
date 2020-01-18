class Word < ApplicationRecord
  belongs_to :book
  PROBLEM_WORDS = {
    'ion' => 2
  }

  def self.count_syllables(_word)
    #remove non-alpha characters
    #binding.pry
    word = _word.gsub(/[^A-z]/, '')
    count = 0

    if PROBLEM_WORDS.has_key?(word)
      count = PROBLEM_WORDS[word]
    else
      #this is an approximation, but it is fairly close
      word.downcase!
      return 1 if word.length <= 3
      word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
      word.sub!(/^y/, '')
      count = word.scan(/[aeiouy]{1,2}/).size
    end

    count
  end

  scope :random_sorted, -> { order('RANDOM()') }

  def count_up
    self.count = self.count + 1
    self.count
  end

end
