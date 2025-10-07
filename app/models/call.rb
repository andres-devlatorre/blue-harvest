class Call < ApplicationRecord
  attr_accessor :role, :participant_id

  belongs_to :speaker, class_name: 'User'
  belongs_to :listener, class_name: 'User'

  validates :call_category, presence: true
  validates :speaker_id, presence: true
  validates :listener_id, presence: true
  validate :participants_must_be_unique

  scope :involving, ->(user_or_id) do
    participant_id = user_or_id.respond_to?(:id) ? user_or_id.id : user_or_id
    where("speaker_id = :id OR listener_id = :id", id: participant_id)
  end

  def participants_must_be_unique
    return unless speaker_id.present? && listener_id.present?
    return if speaker_id != listener_id

    errors.add(:listener_id, 'must be different from speaker')
  end
end
