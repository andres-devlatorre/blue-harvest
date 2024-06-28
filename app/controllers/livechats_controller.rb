class LivechatsController < ApplicationController
  before_action :authenticate_user!

  def index
    @online_users = User.where.not(id: current_user.id).where(online: true)
    @livechats = Livechat.where(participant1_id: current_user.id).or(Livechat.where(participant2_id: current_user.id))
  end

  def show
    @livechat = Livechat.find(params[:id])
  end

  def create
    start_time = Time.now
    matched_user = nil
    while Time.now - start_time < 5
      online_users = User.where.not(id: current_user.id).where(online: true)
      matched_user = online_users.sample
      break if matched_user

      sleep 0.5
    end
    if matched_user
      @livechat = Livechat.new(participant1_id: current_user.id, participant2_id: matched_user.id, status: 'waiting')
      if @livechat.save!
        redirect_to @livechat, notice: 'Live chat was successfully created.'
      else
        render :new, status: :unprocessable_entity
      end
    else
      redirect_to livechats_path, alert: 'No available users to start a live chat.'
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
