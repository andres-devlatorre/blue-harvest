class LivechatsController < ApplicationController
  before_action :authenticate_user!

  def index
    @livechats = Livechat.where(participant1_id: current_user.id).or(Livechat.where(participant2_id: current_user.id))
  end

  def show
    @livechat = Livechat.find(params[:id])
  end

  def create
    online_user_ids = Redis.new.keys('user_*_online').map { |key| key.match(/user_(\d+)_online/)[1] }.map(&:to_i)
    online_user_ids.delete(current_user.id)
    online_users = User.where(id: online_user_ids)
    matched_user = online_users.sample # tweak this once we have actual filters
    if matched_user && current_user.online? && matched_user.online?
      @livechat = Livechat.new(participant1_id: current_user.id, participant2_id: matched_user.id, status: 'pending')
      if @livechat.save
        redirect_to @livechat, notice: 'Live chat was successfully created.'
      else
        render :new, status: :unprocessable_entity
      end
    else
      redirect_to livechats_path, alert: 'Failed to create live chat. Both users need to be online.'
    end
  end

  def update
    # chatroom status should update here, fuck if i know how tho
    @livechat = Livechat.find(params[:id])
    if @livechat.participant1_id.present? && @livechat.participant2_id.present?
      @livechat.update(status: "active")
    else
      @livechat.update(status: "closed")
    end
  end

  def destroy
    # should chats self destroy after the status is changed to closed or stored?
  end
end
