class Message < ApplicationRecord
  belongs_to :user
  belongs_to :livechat
  validates :content, presence: true, length: { minimum: 1 }
  validates :livechat_id, presence: true
end
