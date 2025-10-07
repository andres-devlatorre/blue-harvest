class CallsController < ApplicationController
  before_action :set_call, only: %i[show update]

  def index
    authorize Call
    @calls = policy_scope(Call).order(created_at: :desc)
  end

  def new
    @role = allowed_role(params.dig(:call, :role) || params[:role])
    @call = Call.new(call_category: params.dig(:call, :call_category))
    @call.role = @role
    @participants = available_participants(@role)
    authorize @call
  end

  def create
    call_params = permitted_call_params
    @role = allowed_role(call_params[:role])
    @participants = available_participants(@role)
    @call = Call.new(call_category: call_params[:call_category], connected: true)
    @call.role = @role
    @call.participant_id = call_params[:participant_id]

    authorize @call
    assign_participants(@call, @role, call_params[:participant_id])

    if @call.errors.empty? && @call.save
      redirect_to @call, notice: 'Call started successfully.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    authorize @call
  end

  def update
    authorize @call
    if @call.update(call_update_params)
      redirect_to calls_path, notice: 'Call updated.'
    else
      render :show, status: :unprocessable_entity
    end
  end

  private

  def permitted_call_params
    params.require(:call).permit(:call_category, :participant_id, :role)
  end

  def call_update_params
    params.require(:call).permit(:connected)
  end

  def allowed_role(role)
    %w[speaker listener].include?(role) ? role : 'speaker'
  end

  def available_participants(_role)
    User.where.not(id: current_user.id).order(:email)
  end

  def assign_participants(call, role, participant_id)
    if participant_id.blank?
      call.errors.add(:base, 'Select a participant to start a call.')
      return
    end

    partner = User.find_by(id: participant_id)

    unless partner
      call.errors.add(:participant_id, 'is invalid')
      return
    end

    if partner.id == current_user.id
      call.errors.add(:participant_id, 'must be different from you')
      return
    end

    if role == 'listener'
      call.listener = current_user
      call.speaker = partner
    else
      call.speaker = current_user
      call.listener = partner
    end
  end

  def set_call
    @call = Call.find(params[:id])
  end
end
