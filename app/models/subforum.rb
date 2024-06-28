class Subforum < ApplicationRecord
  has_many :posts, dependent: :destroy
end
