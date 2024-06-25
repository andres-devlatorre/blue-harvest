class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_livechat

  def index
    @messages = @livechat.messages
  end

  # i need to figure out how to make both of these apply to the specific livechat, fun!

  def create
    @message = @livechat.messages.build(message_params)
    @message.user = current_user

    if @message.save
      ActionCable.server.broadcast_to @livechat, message: @message.content, user: @message.user.username
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def set_livechat
    @livechat = Livechat.find(params[:livechat_id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
