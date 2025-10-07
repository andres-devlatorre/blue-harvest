class LivechatPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    def resolve
      return scope.none unless user

      scope.where("participant1_id = :id OR participant2_id = :id", id: user.id)
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

  def update?
    participant?
  end

  def destroy?
    participant?
  end

  def participate?
    participant?
  end

  private

  def participant?
    user.present? && [record.participant1_id, record.participant2_id].include?(user.id)
  end
end
