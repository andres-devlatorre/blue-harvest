class OnlineStatusChannel < ApplicationCable::Channel
  def subscribed
    stream_from "online_status_channel"
    current_user.mark_as_online
    ActionCable.server.broadcast("online_status_channel", { user_id: current_user.id, online: true })
  end

  def unsubscribed
    current_user.mark_as_offline
    ActionCable.server.broadcast("online_status_channel", { user_id: current_user.id, online: false })
  end
end
