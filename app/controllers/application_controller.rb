class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def default_url_options
    { host: ENV[“www.talkblueharvest.me”] || “localhost:3000” }
    end
end
