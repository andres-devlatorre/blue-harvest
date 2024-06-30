module ApplicationHelper
  def random_badge_color
    colors = ['badge-dark-pink', 'badge-blue', 'badge-purple', 'badge-red']
    colors.sample
  end
end
