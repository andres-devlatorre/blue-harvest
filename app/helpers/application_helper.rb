module ApplicationHelper
  def random_badge_color
    colors = ['badge-blue', 'badge-lighter-blue', 'badge-even-lighter-blue', 'badge-lightest-blue']
    colors.sample
  end
end
