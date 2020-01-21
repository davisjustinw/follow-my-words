class Stanza < ApplicationRecord
  has_many :lines
  accepts_nested_attributes_for :lines, :allow_destroy => true
end
