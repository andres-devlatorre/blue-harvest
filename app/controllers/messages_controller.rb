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
      # Turbo::StreamsChannel.broadcast_append_to(
      #   "livechat_#{@livechat.id}",
      #   target: "messages",
      #   partial: "messages/message",
      #   locals: { message: @message }
      # )
      LivechatChannel.broadcast_to(
        @livechat,
        render_to_string(partial: "message", locals: { message: @message })
      )
      # respond_to do |format|
      #   format.turbo_stream
      #   format.html { redirect_to @livechat }
      # end

      head :ok
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
