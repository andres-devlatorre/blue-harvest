class LivechatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "livechat_#{params[:livechat_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # fuck if i know how this works
  end
end
