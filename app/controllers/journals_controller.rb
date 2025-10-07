class JournalsController < ApplicationController
  def index
    @journals = policy_scope(Journal).order(created_at: :desc)
    authorize Journal
  end

  def show
    @journal = Journal.find(params[:id])
    authorize @journal
  end

  def new
    @journal = Journal.new
    authorize @journal
  end

  def create
    @journal = Journal.new(journal_params)
    @journal.user = current_user
    authorize @journal
    if @journal.save
      redirect_to journals_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @journal = Journal.find(params[:id])
    authorize @journal
  end

  def update
    @journal = Journal.find(params[:id])
    authorize @journal
    if @journal.update(journal_params)
      redirect_to journals_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @journal = Journal.find(params[:id])
    authorize @journal
    @journal.destroy
    redirect_to journals_path, status: :see_other
  end

  private

  def journal_params
    params.require(:journal).permit(:title, :content)
  end
end
