class JournalsController < ApplicationController
  def index
    @journals = Journal.where(user_id: current_user.id)
  end

  def show
    @journal = Journal.find(params[:id])
  end

  def new
    @journal = Journal.new
  end

  def create
    @journal = Journal.new(journal_params)
    @journal.user_id = current_user.id
    if @journal.save
      redirect_to journals_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @journal = Journal.find(params[:id])
  end

  def update
    @journal = Journal.find(params[:id])
    if @journal.update(journal_params)
      redirect_to journals_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @journal = Journal.find(params[:id])
    @journal.destroy
    redirect_to journals_path, status: :see_other
  end
  private
  def journal_params
    params.require(:journal).permit(:title, :content)
  end
end
