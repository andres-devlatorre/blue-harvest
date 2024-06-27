class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  after_initialize :set_default_online
  has_many :messages
  has_many :livechats_as_participant1, class_name: 'Livechat', foreign_key: 'participant1_id'
  has_many :livechats_as_participant2, class_name: 'Livechat', foreign_key: 'participant2_id'
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  def set_default_online
    self.online ||= false
  end
end
