class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_livechat

  def index
  end

  # i need to figure out how to make both of these apply to the specific livechat, fun!

  def create
  end

  private

  def set_livechat
    @livechat = Livechat.find(params[:livechat_id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
