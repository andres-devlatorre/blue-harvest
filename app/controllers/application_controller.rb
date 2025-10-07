class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  include Pundit::Authorization

  # Rescue from Pundit errors
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def default_url_options
    { host: ENV["www.talkblueharvest.me"] || "localhost:3000" }
  end

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(request.referrer || root_path)
  end
end
