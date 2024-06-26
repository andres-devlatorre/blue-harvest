class UsersController < ApplicationController
  before_action :authenticate_user!, except: %i[create index]
  before_action :set_user, only: %i[show edit update destroy]

  def index
    # probably unnecesary, depends on how front wants to handle it and if we want it as a feature
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to @user # add some type of notice at some point, i hate front end slop
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to @user # add some type of notice at some point, i hate front end slop
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    if current_user.admin? || current_user == @user
      @user.destroy
      redirect_to root_path, notice: 'Your account was succesfully deleted.'
    else
      redirect_to root_path, alert: 'Unauthorized'
    end
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password) # once again this is up to schema decisions
  end
end
