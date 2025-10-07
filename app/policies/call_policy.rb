class CallPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    def resolve
      return scope.none unless user

      scope.involving(user)
    end
  end

  def index?
    user.present?
  end

  def show?
    participant?
  end

  def create?
    user.present?
  end

  def new?
    create?
  end

  def update?
    participant?
  end

  def destroy?
    participant?
  end

  private

  def participant?
    user.present? && [record.speaker_id, record.listener_id].include?(user.id)
  end
end
