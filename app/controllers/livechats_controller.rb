class LivechatsController < ApplicationController
  before_action :authenticate_user!

  def index
    @livechats = Livechat.where(participant1_id: current_user.id).or(Livechat.where(participant2_id: current_user.id))
  end

  def show
    @livechat = Livechat.find(params[:id])
  end

  def create
    # matching criteria should be here right?
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
