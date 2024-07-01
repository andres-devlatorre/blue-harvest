class Post < ApplicationRecord
  belongs_to :user
  belongs_to :subforum

  has_many :comments, dependent: :destroy

  include PgSearch::Model
  pg_search_scope :search_by_title_and_content,
  against: [ :title, :content ],
  using: {
    tsearch: { prefix: true } # <-- now `superman batm` will return something!
  }
end
