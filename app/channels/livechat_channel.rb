class LivechatChannel < ApplicationCable::Channel
  def subscribed
    livechat = Livechat.find(params[:id])
    # if livechat.participants.include?(current_user)
      stream_for livechat
    # else
     # reject
    # end
  end

  def unsubscribed
    # fuck if i know how this works
  end
end
