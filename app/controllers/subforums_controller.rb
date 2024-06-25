class SubforumsController < ApplicationController
  before_action :set_subforum, only: %i[show edit update destroy]

  def index
    @subforums = Subforum.all
  end

  def show
  end

  def new
    @subforum = Subforum.new
  end

  def create
    @subforum = Subforum.new(subforum_params)
    if @subforum.save
      redirect_to subforum_path(@subforum)
    else
      render :new, status: :unprocessable
    end
  end

  def edit
  end

  def update
    if @subforum.update(subforum_params)
      redirect_to subforum_path(@subforum)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @subforum.destroy
    redirect_to subforums_path
  end

  private

  def subforum_params
    params.require(:subforum).permit(:name, :description)
  end

  def set_subforum
    @subforum = Subforum.find(params[:id])
  end
end
