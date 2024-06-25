class Livechat < ApplicationRecord
  belongs_to :participant1, class_name: 'User', foreign_key: 'participant1_id'
  belongs_to :participant2, class_name: 'User', foreign_key: 'participant2_id'
  has_many :messages, dependent: :destroy
  validates :participant1_id, presence: true
  validates :participant2_id, presence: true, exclusion: { in: ->(livechat) { [livechat.participant1_id] } }
  validates :status, presence: true, inclusion: { in: %w[active closed] }
  validate :participants_must_be_unique

  private

  def participants_must_be_unique
    errors.add(:participant2_id, "must be different from participant1") if participant1_id == participant2_id
  end
end
