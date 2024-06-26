class User < ApplicationRecord
  has_many :messages
  has_many :livechats_as_participant1, class_name: 'Livechat', foreign_key: 'participant1_id'
  has_many :livechats_as_participant2, class_name: 'Livechat', foreign_key: 'participant2_id'
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def mark_as_online
    Redis.new.set("user_#{id}_online", true, ex: 5.minutes.to_i)
  end

  def mark_as_offline
    Redis.new.del("user_#{id}_online")
  end

  def online?
    Redis.new.exists?("user_#{id}_online")
  end
end
