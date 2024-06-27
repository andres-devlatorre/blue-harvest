class OnlineStatusChannel < ApplicationCable::Channel
  def subscribed
    current_user.update(online: true)
    stream_from "online_status_channel"
    # current_user.mark_as_online
    livechat = Livechat.find(params[:id])
    stream_for livechat
    ActionCable.server.broadcast("online_status_channel", { users: User.where(online: true).pluck(:email) })
  end

  def unsubscribed
    current_user.update(online: false)
    ActionCable.server.broadcast("online_status_channel", { users: User.where(online: true).pluck(:email) })
  end
end
