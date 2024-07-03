module Turbo
  class StreamsChannel < ApplicationCable::Channel
    def subscribed
      stream_from "livechat_#{params[:livechat_id]}"
    end
  end
end
