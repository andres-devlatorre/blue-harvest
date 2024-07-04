class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def dashboard
    @users = User.all
    @user = current_user
  end

  def mental_health
  end

  def about_us
  end

end
