class LivechatChannel < ApplicationCable::Channel
  def subscribed
    livechat = Livechat.find(params[:livechat_id])
    if livechat.participants.include?(current_user)
      stream_from "livechat_#{params[:livechat_id]}"
    else
      reject
    end
  end

  def unsubscribed
    # fuck if i know how this works
  end
end
