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
  end

  def destroy
    # should chats self destroy after the status is changed to closed or stored?
  end
end
